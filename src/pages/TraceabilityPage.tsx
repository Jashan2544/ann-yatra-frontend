import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SupplyChainTimeline from "@/components/SupplyChainTimeline";
import { QrCode, Search, Shield, Eye, FileText, MapPin } from "lucide-react";

const TraceabilityPage = () => {
  const [batchId, setBatchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [batchData, setBatchData] = useState<any>(null);

  const mockBatchData = {
    batchId: "TOM-789123",
    cropType: "Tomato",
    variety: "Cherry Tomato",
    quantity: "500 kg",
    farmer: "Ravi Kumar",
    origin: "Nashik, Maharashtra",
    harvestDate: "2024-01-15",
    status: "At Retailer",
    certifications: ["Organic Certified", "Pesticide Free"],
    events: [
      {
        id: "1",
        title: "Batch Created",
        description: "Fresh tomatoes harvested and registered on blockchain",
        timestamp: "Jan 15, 2024 - 8:30 AM",
        status: "completed" as const,
        actor: "Ravi Kumar (Farmer)",
        location: "Nashik, Maharashtra",
        txHash: "0x1234567890abcdef1234567890abcdef12345678"
      },
      {
        id: "2", 
        title: "Quality Testing",
        description: "Laboratory testing completed - All parameters within limits",
        timestamp: "Jan 15, 2024 - 2:15 PM",
        status: "completed" as const,
        actor: "AgriLab Testing Center",
        location: "Nashik, Maharashtra",
        txHash: "0xabcdef1234567890abcdef1234567890abcdef12"
      },
      {
        id: "3",
        title: "Picked up by Distributor", 
        description: "Cold chain transport initiated to retail centers",
        timestamp: "Jan 16, 2024 - 6:00 AM",
        status: "completed" as const,
        actor: "FreshTrans Logistics",
        location: "Nashik → Mumbai",
        txHash: "0x567890abcdef1234567890abcdef1234567890ab"
      },
      {
        id: "4",
        title: "Arrived at Retail Store",
        description: "Products received and quality verified at destination",
        timestamp: "Jan 16, 2024 - 4:30 PM", 
        status: "current" as const,
        actor: "Green Mart Supermarket",
        location: "Mumbai, Maharashtra",
        txHash: "0xcdef1234567890abcdef1234567890abcdef1234"
      },
      {
        id: "5",
        title: "Available for Purchase",
        description: "Products displayed and ready for consumer purchase",
        timestamp: "Pending",
        status: "pending" as const,
        actor: "Green Mart Supermarket",
        location: "Mumbai, Maharashtra"
      }
    ]
  };

  const handleSearch = async () => {
    if (!batchId.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setBatchData(mockBatchData);
    setIsLoading(false);
  };

  const handleQRScan = () => {
    // Simulate QR scan
    setBatchId("TOM-789123");
    setBatchData(mockBatchData);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Traceability</h1>
              <p className="text-muted-foreground">Track your food's complete journey from farm to table</p>
            </div>
          </div>
          <Separator />
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Track Your Product</span>
            </CardTitle>
            <CardDescription>
              Enter a batch ID or scan a QR code to view complete supply chain history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Label htmlFor="batchId" className="sr-only">Batch ID</Label>
                <Input
                  id="batchId"
                  placeholder="Enter Batch ID (e.g., TOM-789123)"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-primary hover:bg-primary/90"
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleQRScan}
                  className="h-12 px-6"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Scan QR
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Try demo:</strong> Use batch ID "TOM-789123" to see a complete supply chain trace
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {batchData && (
          <div className="space-y-8">
            {/* Batch Info */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-success" />
                      <span>Verified Product Information</span>
                    </CardTitle>
                    <CardDescription>Blockchain-verified product details</CardDescription>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Product Details</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-muted-foreground">Batch ID:</span> {batchData.batchId}</div>
                      <div><span className="text-muted-foreground">Crop:</span> {batchData.cropType}</div>
                      <div><span className="text-muted-foreground">Variety:</span> {batchData.variety}</div>
                      <div><span className="text-muted-foreground">Quantity:</span> {batchData.quantity}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Origin Information</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-muted-foreground">Farmer:</span> {batchData.farmer}</div>
                      <div><span className="text-muted-foreground">Location:</span> {batchData.origin}</div>
                      <div><span className="text-muted-foreground">Harvest:</span> {batchData.harvestDate}</div>
                      <div><span className="text-muted-foreground">Status:</span> {batchData.status}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Certifications</h4>
                    <div className="space-y-2">
                      {batchData.certifications.map((cert: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Documents</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Lab Report
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Organic Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Supply Chain Journey</span>
                </CardTitle>
                <CardDescription>
                  Complete traceability from farm to your table
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupplyChainTimeline events={batchData.events} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results State */}
        {!batchData && !isLoading && (
          <Card className="shadow-card text-center py-12">
            <CardContent>
              <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Track</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Enter a batch ID or scan a QR code from product packaging to view its complete supply chain history
              </p>
              <Button onClick={handleQRScan} className="bg-gradient-primary hover:bg-primary/90">
                Try Demo Trace
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TraceabilityPage;