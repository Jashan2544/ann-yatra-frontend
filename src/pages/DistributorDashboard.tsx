import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Truck, QrCode, Package, ArrowRight, Clock, CheckCircle } from "lucide-react";

const DistributorDashboard = () => {
  const { toast } = useToast();
  const [isTransferring, setIsTransferring] = useState(false);
  const [scannedBatch, setScannedBatch] = useState<any>(null);

  const [transferData, setTransferData] = useState({
    batchId: "",
    destinationType: "",
    destination: "",
    expectedDelivery: "",
    temperature: "",
    notes: ""
  });

  const mockBatch = {
    batchId: "TOM-789123",
    cropType: "Tomato",
    variety: "Cherry Tomato", 
    quantity: "500 kg",
    farmer: "Ravi Kumar",
    origin: "Nashik, Maharashtra",
    currentLocation: "Distribution Center, Pune"
  };

  const handleScanQR = () => {
    setScannedBatch(mockBatch);
    setTransferData({...transferData, batchId: mockBatch.batchId});
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferring(true);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsTransferring(false);
    toast({
      title: "Transfer Recorded!",
      description: "Batch transfer has been recorded on the blockchain with immutable proof.",
    });

    // Reset form
    setTransferData({
      batchId: "",
      destinationType: "",
      destination: "",
      expectedDelivery: "",
      temperature: "",
      notes: ""
    });
    setScannedBatch(null);
  };

  const activeBatches = [
    { 
      id: "TOM-789123", 
      crop: "Tomato", 
      quantity: "500 kg", 
      from: "Ravi Kumar", 
      status: "In Transit",
      pickup: "Jan 16, 8:00 AM",
      eta: "Jan 16, 6:00 PM"
    },
    { 
      id: "RIC-456789", 
      crop: "Rice", 
      quantity: "2 tons", 
      from: "Sunita Devi", 
      status: "Delivered",
      pickup: "Jan 15, 10:00 AM",
      eta: "Jan 15, 8:00 PM"
    },
    { 
      id: "WHE-123456", 
      crop: "Wheat", 
      quantity: "1.5 tons", 
      from: "Mahesh Singh", 
      status: "Ready for Pickup",
      pickup: "Jan 17, 7:00 AM",
      eta: "Jan 17, 5:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Distributor Dashboard</h1>
              <p className="text-muted-foreground">Manage batch transfers and maintain cold chain records</p>
            </div>
          </div>
          <Separator />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transfer Form */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>Scan & Transfer</span>
                </CardTitle>
                <CardDescription>
                  Scan batch QR code and record transfer to next destination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={handleScanQR}
                    variant="outline" 
                    className="w-full h-24 border-dashed border-2 bg-muted/30 hover:bg-muted/50"
                  >
                    <div className="text-center">
                      <QrCode className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <span>Tap to Scan QR Code</span>
                    </div>
                  </Button>

                  {scannedBatch && (
                    <Card className="bg-success/10 border-success/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span className="font-semibold text-success">Batch Scanned Successfully</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="text-muted-foreground">ID:</span> {scannedBatch.batchId}</div>
                          <div><span className="text-muted-foreground">Crop:</span> {scannedBatch.cropType}</div>
                          <div><span className="text-muted-foreground">Quantity:</span> {scannedBatch.quantity}</div>
                          <div><span className="text-muted-foreground">From:</span> {scannedBatch.farmer}</div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>

            {scannedBatch && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Record Transfer</CardTitle>
                  <CardDescription>Update blockchain with transfer details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTransfer} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="destinationType">Destination Type</Label>
                      <Select value={transferData.destinationType} onValueChange={(value) => setTransferData({...transferData, destinationType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="processor">Food Processor</SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="distributor">Another Distributor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination Details</Label>
                      <Input
                        id="destination"
                        value={transferData.destination}
                        onChange={(e) => setTransferData({...transferData, destination: e.target.value})}
                        placeholder="Company name, address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                        <Input
                          id="expectedDelivery"
                          type="datetime-local"
                          value={transferData.expectedDelivery}
                          onChange={(e) => setTransferData({...transferData, expectedDelivery: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Storage Temp (°C)</Label>
                        <Input
                          id="temperature"
                          type="number"
                          value={transferData.temperature}
                          onChange={(e) => setTransferData({...transferData, temperature: e.target.value})}
                          placeholder="2-8"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Transfer Notes</Label>
                      <Input
                        id="notes"
                        value={transferData.notes}
                        onChange={(e) => setTransferData({...transferData, notes: e.target.value})}
                        placeholder="Special handling instructions, quality notes"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-trust hover:bg-primary/90 shadow-glow"
                      disabled={isTransferring}
                    >
                      {isTransferring ? "Recording Transfer..." : "Record Transfer on Blockchain"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Active Batches */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Active Batches</span>
              </CardTitle>
              <CardDescription>Batches currently in your logistics network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeBatches.map((batch) => (
                  <Card key={batch.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-foreground">{batch.id}</div>
                          <div className="text-sm text-muted-foreground">{batch.crop} • {batch.quantity}</div>
                          <div className="text-sm text-muted-foreground">From: {batch.from}</div>
                        </div>
                        <Badge 
                          variant={batch.status === "Delivered" ? "default" : 
                                 batch.status === "In Transit" ? "secondary" : "outline"}
                          className="flex items-center space-x-1"
                        >
                          {batch.status === "Delivered" && <CheckCircle className="w-3 h-3" />}
                          {batch.status === "In Transit" && <Truck className="w-3 h-3" />}
                          {batch.status === "Ready for Pickup" && <Clock className="w-3 h-3" />}
                          <span>{batch.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Pickup:</span> {batch.pickup}
                        </div>
                        <div>
                          <span className="text-muted-foreground">ETA:</span> {batch.eta}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Update Status
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Active Batches</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">18</div>
              <div className="text-sm text-muted-foreground">Delivered Today</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Pending Pickup</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">99.2%</div>
              <div className="text-sm text-muted-foreground">Cold Chain Integrity</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;