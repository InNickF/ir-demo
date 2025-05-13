export const calculateLeaseExpirationDate = ({
  leaseTermYears = 0,
  leaseTermMonths = 0,
  commencementDate,
}: {
  leaseTermYears: number | string;
  leaseTermMonths: number | string;
  commencementDate: Date | string;
}): string | null => {
  if (!commencementDate) {
    return null;
  }

  const startDate = new Date(commencementDate);

  const expirationDate = new Date(
    startDate.getUTCFullYear() + Number(leaseTermYears || 0),
    startDate.getUTCMonth() + Number(leaseTermMonths || 0),
    startDate.getUTCDate()
  );

  const formattedDate = expirationDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return leaseTermYears && leaseTermYears ? formattedDate : null;
};

export const calculatePSF = ({
  amount = 0,
  size = 0,
}: {
  amount: number | string;
  size: number | string;
}): number => {
  if (!amount || !size) {
    return null;
  }

  const psf = Number(amount) / Number(size);
  return Math.round(psf * 100) / 100;
};
