import { Revenue } from './definitions';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutFormProps {
  cartItems: MenuItem[];
  onClose: () => void;
  onSuccess: () => void;
}

export function formatCurrency(value: any): string {
  // Gunakan toNumber jika value adalah tipe Decimal
  const numValue = typeof value === "object" && "toNumber" in value ? value.toNumber() : value;
  return `Rp${numValue.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;
}


// export const formatCurrency = (amount: number) => {
//   if (typeof amount !== "number" || isNaN(amount)) {
//     return "IDR 0"; // Tampilkan default jika amount tidak valid
//   }
//   return "IDR " + amount.toLocaleString("id-ID", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   });
// };

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
};


export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
