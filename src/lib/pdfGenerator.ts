import { jsPDF } from 'jspdf';
import { Building, Apartment } from '../types';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';

export const generateBillPDF = (
  building: Building, 
  apartment: Apartment, 
  calculation: { common: number, heating: number, elevator: number, special: number, total: number },
  month: number,
  year: number
) => {
  const doc = new jsPDF();
  const monthName = format(new Date(year, month - 1), 'MMMM yyyy', { locale: el });

  // Header
  doc.setFontSize(22);
  doc.setTextColor(0, 102, 204);
  doc.text('iKoinoxrista.gr', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text('ΕΙΔΟΠΟΙΗΤΗΡΙΟ ΚΟΙΝΟΧΡΗΣΤΩΝ', 105, 30, { align: 'center' });
  
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);

  // Building Info
  doc.setFontSize(12);
  doc.text(`Πολυκατοικία: ${building.name}`, 20, 50);
  doc.text(`Διεύθυνση: ${building.address}`, 20, 57);
  doc.text(`Μήνας: ${monthName}`, 190, 50, { align: 'right' });

  // Apartment Info
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 65, 170, 30, 'F');
  doc.setFontSize(11);
  doc.text(`Διαμέρισμα: ${apartment.number}`, 25, 75);
  doc.text(`Ένοικος/Ιδιοκτήτης: ${apartment.ownerName || '---'}`, 25, 82);

  // Calculation Table
  let y = 110;
  doc.setFontSize(12);
  doc.text('Ανάλυση Δαπανών', 20, y);
  doc.line(20, y + 2, 190, y + 2);

  const categories = [
    { label: 'Κοινόχρηστα', val: calculation.common },
    { label: 'Θέρμανση', val: calculation.heating },
    { label: 'Ανελκυστήρας', val: calculation.elevator },
    { label: 'Ειδικά/Άλλα', val: calculation.special },
  ];

  y += 15;
  categories.forEach(cat => {
    doc.text(cat.label, 20, y);
    doc.text(`${cat.val.toFixed(2)} €`, 190, y, { align: 'right' });
    y += 10;
  });

  doc.setLineWidth(1);
  doc.line(20, y, 190, y);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ΣΥΝΟΛΙΚΟ ΠΟΣΟ ΠΛΗΡΩΜΗΣ:', 20, y + 15);
  doc.text(`${calculation.total.toFixed(2)} €`, 190, y + 15, { align: 'right' });

  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text('Σας ευχαριστούμε για την εμπιστοσύνη σας στο iKoinoxrista.gr', 105, 280, { align: 'center' });
  doc.text(`Ημερομηνία Έκδοσης: ${format(new Date(), 'dd/MM/yyyy')}`, 105, 285, { align: 'center' });

  doc.save(`Koinoxrista_${building.name}_${apartment.number}_${month}_${year}.pdf`);
};
