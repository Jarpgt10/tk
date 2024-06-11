<?php

$_DIR = explode('api', __DIR__)[0];
require $_DIR . '/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Reportes
{
    public function __construct($conexion)
    {
        $this->_CONN = $conexion;
    }

    public function GenerateReportTicketToday()
    {
        $arr = [];
        $date = date('Y-m-d');
        $strQuery = " SELECT A.*,
                        concat_ws(' ',B.primer_nombre,B.segundo_nombre,B.primer_apellido,B.segundo_apellido) as usuario_creacion,
                        concat_ws(' ',C.primer_nombre,C.segundo_nombre,C.primer_apellido,C.segundo_apellido) as usuario_asignado,
                        concat_ws(' ',D.primer_nombre,D.segundo_nombre,D.primer_apellido,D.segundo_apellido) as usuario_cerrado
                    FROM ticket A
                        INNER JOIN usuario B ON A.id_usuario_creacion = B.id_usuario
                        LEFT JOIN usuario C ON A.id_usuario_asignado = C.id_usuario
                        LEFT JOIN usuario D ON A.id_usuario_cerrado = D.id_usuario 
                        WHERE A.fecha_creacion >= '{$date} 00:00:00' AND A.fecha_creacion <= '{$date} 23:59:59'";
        $qTmp = $this->_CONN->db_consulta($strQuery);
        while ($rTmp = $this->_CONN->db_fetch_object($qTmp)) {
            $arr[] = $rTmp;
        }
        $spreadsheet = new Spreadsheet();
        $spreadsheet
            ->getProperties()
            ->setCreator('Tickets')
            ->setTitle('nuevo')
            ->setDescription('Reportes Tickets Diarios');

        $sheet = $spreadsheet->getActiveSheet();

        // Establecer estilo para los encabezados
        $styleArray = [
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'], // Color del texto en blanco
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => '2E75B6'], // Color de fondo azul
            ],
        ];

        $sheet->getStyle('A1:G1')->applyFromArray($styleArray);

        $sheet->setCellValue('A1', 'No.Ticket');
        $sheet->setCellValue('B1', 'Titulo ticket');
        $sheet->setCellValue('C1', 'Fecha Creado');
        $sheet->setCellValue('D1', 'Usuario Creación');
        $sheet->setCellValue('E1', 'Usuario Asignado');
        $sheet->setCellValue('F1', 'Usuario Cerrado');
        $sheet->setCellValue('G1', 'Estado');

        $count = 2;
        foreach ($arr as $value) {
            $sheet->setCellValue('A' . $count, $value->id_ticket);
            $sheet->setCellValue('B' . $count, $value->titulo);
            $sheet->setCellValue('C' . $count, $value->fecha_creacion);
            $sheet->setCellValue('D' . $count, $value->usuario_creacion);
            $sheet->setCellValue('E' . $count, $value->usuario_asignado);
            $sheet->setCellValue('F' . $count, $value->usuario_cerrado);
            $sheet->setCellValue('G' . $count, $value->estado);
            $count++;
        }

        // Guardar y descargar el archivo
        $writer = new Xlsx($spreadsheet);
        $nombre_archivo = 'Tickets_diarios.xlsx';
        $writer->save($nombre_archivo);

        ob_clean();
        header(
            'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        header(
            'Content-Disposition: attachment; filename="' .
                basename($nombre_archivo) .
                '"'
        );
        header('Content-Length: ' . filesize($nombre_archivo));
        readfile($nombre_archivo);
        exit();
    }
}
?>
