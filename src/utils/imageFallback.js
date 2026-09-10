// Elegant SVG fallback image for luxury jewelry
export const FALLBACK_JEWELRY_IMAGE = 
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23111827'/%3E%3Cstop offset='50%25' stop-color='%231F2937'/%3E%3Cstop offset='100%25' stop-color='%230B0F19'/%3E%3C/linearGradient%3E%3ClinearGradient id='gold' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23F5E6AB'/%3E%3Cstop offset='50%25' stop-color='%23D4AF37'/%3E%3Cstop offset='100%25' stop-color='%23996515'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='800' fill='url(%23bg)'/%3E%3Ccircle cx='400' cy='380' r='180' stroke='url(%23gold)' stroke-width='3' fill='none' opacity='0.4' stroke-dasharray='10 15'/%3E%3Cpolygon points='400,280 470,360 400,480 330,360' fill='none' stroke='url(%23gold)' stroke-width='6' stroke-linejoin='round'/%3E%3Cpolygon points='400,280 435,360 400,480 365,360' fill='url(%23gold)' opacity='0.25'/%3E%3Cline x1='330' y1='360' x2='470' y2='360' stroke='url(%23gold)' stroke-width='4'/%3E%3Ctext x='400' y='560' font-family='serif' font-size='32' fill='%23D4AF37' text-anchor='middle' font-weight='bold' letter-spacing='4'%3EMAHA PRABHU JEWELLERS%3C/text%3E%3Ctext x='400' y='605' font-family='sans-serif' font-size='20' fill='%239CA3AF' text-anchor='middle'%3EBIS 916 Hallmarked Collection%3C/text%3E%3C/svg%3E";

export const handleImageError = (e, fallback = FALLBACK_JEWELRY_IMAGE) => {
  if (e.target.src !== fallback) {
    e.target.src = fallback;
  }
};
