import { useState, useEffect } from 'react';
import { parseISO, intervalToDuration } from 'date-fns';

const useDurationFromISO = (startISO: string, endISO: string): string => {
  const [formattedDuration, setFormattedDuration] = useState<string>('');

  useEffect(() => {
    if (startISO && endISO) {
      // ISO tarihlerini Date nesnesine dönüştür
      const startDate = parseISO(startISO);
      const endDate = parseISO(endISO);

      // İki tarih arasındaki süreyi hesapla
      const duration: any = intervalToDuration({ start: startDate, end: endDate });

      // Süreyi "xh ym" formatında oluştur
      const hours = duration.hours > 0 ? `${duration.hours}h` : '0h';
      const minutes = duration.minutes > 0 ? `${duration.minutes}m` : '';

      // Formatlanmış süreyi ayarla
      setFormattedDuration(`${hours} ${minutes}`.trim()); // Boşlukları temizle
    }
  }, [startISO, endISO]); // startISO veya endISO değiştiğinde çalışır

  return formattedDuration;
};

export default useDurationFromISO;
