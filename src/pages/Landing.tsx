import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Leaf, Eye, QrCode, Truck, Store } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every transaction is recorded on an immutable blockchain, ensuring complete transparency and trust."
    },
    {
      icon: QrCode,
      title: "QR Code Tracking",
      description: "Simple QR codes allow instant access to complete product history from farm to consumer."
    },
    {
      icon: Eye,
      title: "Full Traceability",
      description: "Track every step of your food's journey with timestamps and verification at each stage."
    }
  ];

  const stakeholders = [
    {
      icon: Leaf,
      title: "Farmers",
      description: "Create verified batches, upload certificates, and get fair prices for quality produce.",
      link: "/farmer",
      color: "bg-gradient-primary"
    },
    {
      icon: Truck,
      title: "Distributors",
      description: "Scan, transfer, and maintain cold chain records with blockchain verification.",
      link: "/distributor",
      color: "bg-gradient-trust"
    },
    {
      icon: Store,
      title: "Retailers",
      description: "Provide customers with complete product history and build trust through transparency.",
      link: "/trace",
      color: "bg-gradient-harvest"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
            Blockchain-Powered Supply Chain
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            अन्नYatra
            <span className="block text-3xl md:text-4xl font-normal mt-2 text-white/90">
              From Farm to Fork, Verified
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Complete transparency in food supply chains through blockchain technology. 
            Track your food's journey with immutable records and QR code verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trace">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                <QrCode className="w-5 h-5 mr-2" />
                Track a Product
              </Button>
            </Link>
            <Link to="/farmer">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Leaf className="w-5 h-5 mr-2" />
                Start as Farmer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose अन्नYatra?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our blockchain-powered platform ensures every step of your food's journey is recorded, verified, and transparent.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center shadow-card hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              For Every Stakeholder
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ann Yatra serves everyone in the supply chain, from farmers to consumers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder, index) => {
              const Icon = stakeholder.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                  <Link to={stakeholder.link}>
                    <CardHeader>
                      <div className={`w-16 h-16 ${stakeholder.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-center">{stakeholder.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-center">
                        {stakeholder.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-nature text-white shadow-glow">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of farmers, distributors, and retailers already using Ann Yatra 
                to build trust and transparency in their supply chains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/farmer">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/trace">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;