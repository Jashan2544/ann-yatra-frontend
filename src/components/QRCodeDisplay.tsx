import { QrCode, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QRCodeDisplayProps {
  data: string;
  size?: number;
  title?: string;
  showActions?: boolean;
}

const QRCodeDisplay = ({ data, size = 200, title, showActions = true }: QRCodeDisplayProps) => {
  const handleDownload = () => {
    // In a real app, this would generate and download the actual QR code
    console.log("Downloading QR code for:", data);
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: title || "Ann Yatra Product Trace",
        url: data,
      });
    } else {
      navigator.clipboard.writeText(data);
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 text-center">
        <div 
          className="mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center relative"
          style={{ width: size, height: size }}
        >
          <QrCode className="w-24 h-24 text-gray-400" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="grid grid-cols-10 gap-1 opacity-30">
              {Array.from({ length: 100 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {title && (
          <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        )}
        
        <p className="text-xs text-muted-foreground break-all mb-4 font-mono bg-muted/30 p-2 rounded">
          {data}
        </p>
        
        {showActions && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;