import type { TypographyProps } from '@material-tailwind/react';
import { Typography as MTTypography } from '@material-tailwind/react';

export default function Typography({ children, ...props }: TypographyProps) {
  // TODO: Remove these undefined props after upgrading dependencies and see if it keeps breaking
  return (
    <MTTypography
      {...props}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {children}
    </MTTypography>
  );
}
