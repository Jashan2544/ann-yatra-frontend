import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Upload, QrCode, Package, Calendar, MapPin } from "lucide-react";
import QRCodeDisplay from "@/components/QRCodeDisplay";

const FarmerDashboard = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    batchId: "",
    cropType: "",
    variety: "",
    quantity: "",
    unit: "kg",
    harvestDate: "",
    location: "",
    description: "",
    organicCertified: false,
  });

  const cropTypes = [
    "Rice", "Wheat", "Tomato", "Potato", "Onion", "Carrot", "Cabbage", "Spinach",
    "Apple", "Banana", "Orange", "Mango", "Grapes", "Cotton", "Sugarcane"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    const batchId = `BATCH-${Date.now()}`;
    const qrData = `https://annyatra.com/trace/${batchId}`;
    
    setQrCodeData(qrData);
    setIsCreating(false);
    
    toast({
      title: "Batch Created Successfully!",
      description: "Your crop batch has been recorded on the blockchain with immutable verification.",
    });
  };

  const generateBatchId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const crop = formData.cropType.slice(0, 3).toUpperCase();
    return `${crop}-${timestamp}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Create and manage your crop batches on the blockchain</p>
            </div>
          </div>
          <Separator />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Batch Creation Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Create New Batch</span>
              </CardTitle>
              <CardDescription>
                Register a new crop batch on the blockchain for complete traceability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batchId">Batch ID</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="batchId"
                        value={formData.batchId}
                        onChange={(e) => setFormData({...formData, batchId: e.target.value})}
                        placeholder="AUTO-GENERATED"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({...formData, batchId: generateBatchId()})}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="variety">Variety</Label>
                    <Input
                      id="variety"
                      value={formData.variety}
                      onChange={(e) => setFormData({...formData, variety: e.target.value})}
                      placeholder="e.g., Basmati, Heirloom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      placeholder="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="tons">Tons</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Village, District, State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Growing conditions, certifications, special notes..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Upload Certificates</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:bg-primary/90 shadow-glow" 
                  disabled={isCreating}
                >
                  {isCreating ? "Creating Batch..." : "Create Batch on Blockchain"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* QR Code Display & Recent Batches */}
          <div className="space-y-6">
            {qrCodeData && (
              <Card className="shadow-card bg-gradient-nature text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="w-5 h-5" />
                    <span>Batch QR Code</span>
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Print this QR code for product packaging
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QRCodeDisplay 
                    data={qrCodeData} 
                    title="Batch Traceability Code"
                    size={200}
                  />
                </CardContent>
              </Card>
            )}

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Batches</CardTitle>
                <CardDescription>Your recently created crop batches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "TOM-789123", crop: "Tomato", quantity: "500 kg", date: "2024-01-15", status: "Active" },
                    { id: "RIC-456789", crop: "Rice", quantity: "2 tons", date: "2024-01-12", status: "Transferred" },
                    { id: "WHE-123456", crop: "Wheat", quantity: "1.5 tons", date: "2024-01-10", status: "Sold" },
                  ].map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{batch.id}</div>
                        <div className="text-sm text-muted-foreground">{batch.crop} • {batch.quantity}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={batch.status === "Active" ? "default" : "secondary"}>
                          {batch.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">{batch.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;