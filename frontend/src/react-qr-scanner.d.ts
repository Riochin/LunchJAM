declare module "react-qr-scanner" {
  import { ComponentType } from "react";

  interface QrScannerProps {
    onScan: (result: string | null) => void;
    onError: (error: Error) => void;
    facingMode?: "user" | "environment";
    delay?: number | false;
    style?: React.CSSProperties;
    className?: string;
    constraints?: MediaTrackConstraints;
  }

  const QrScanner: ComponentType<QrScannerProps>;
  export default QrScanner;
}
