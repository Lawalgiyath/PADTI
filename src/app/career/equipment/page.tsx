
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Zap, Fuel, Info, Package, Settings, Star } from "lucide-react";

export default function EquipmentMarketplacePage() {
  const listings = [
    {
      name: "Scania R-Series (Euro 6)",
      provider: "Scania Global",
      description: "Premium articulated unit with advanced safety features and eco-driving integration.",
      price: "From €125,000",
      specs: ["Euro 6 Engine", "Sleeper Cab", "PADTI Certified"],
      condition: "New"
    },
    {
      name: "Mercedes-Benz Actros Electric",
      provider: "Daimler Truck",
      description: "The future of urban and regional articulated logistics. Zero emissions, maximum efficiency.",
      price: "Contact for Lease",
      specs: ["400km Range", "Full Telematics", "Smart Charging"],
      condition: "Available"
    },
    {
      name: "Standard Articulated Trailer",
      provider: "Schmitz Cargobull",
      description: "High-durability curtainsider trailer with aerodynamic optimizations.",
      price: "€32,000",
      specs: ["13.6m Length", "Disc Brakes", "Load Security Certified"],
      condition: "New"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <Badge className="bg-orange-500 text-white px-4 py-1 border-none">EQUIPMENT & ASSETS</Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-headline leading-tight">Elite Fleet <br />Marketplace</h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Procure world-class articulated vehicles and equipment from verified global manufacturers and lessors.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="rounded-xl h-12 font-bold bg-white">Sell Equipment</Button>
                <Button className="rounded-xl h-12 font-bold px-8">Leasing Options</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((item, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[32px] overflow-hidden bg-white group">
                  <div className="h-48 bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                    <Truck className="h-20 w-20 text-primary/20 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-primary border-none shadow-sm">{item.condition}</Badge>
                    </div>
                  </div>
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
                    <CardDescription className="font-bold text-primary/70">{item.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-2 space-y-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    <div className="space-y-2">
                      {item.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                          <Settings className="h-3 w-3 text-primary" /> {spec}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-secondary">
                      <span className="text-lg font-black text-primary">{item.price}</span>
                      <Button variant="ghost" size="sm" className="font-bold text-primary">View Specs</Button>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold">
                      Contact Sales
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm rounded-[32px] bg-white p-10 flex gap-6 items-start">
                <div className="bg-accent/10 p-4 rounded-2xl text-accent-foreground shrink-0">
                  <Star className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Manufacturer Partnerships</h3>
                  <p className="text-muted-foreground text-sm">Join our network of verified OEMs and lessors. Showcase your inventory to the world's fastest-growing logistics community.</p>
                  <Button variant="link" className="p-0 text-primary font-bold h-auto mt-2">Become a Vendor</Button>
                </div>
              </Card>
              <Card className="border-none shadow-sm rounded-[32px] bg-white p-10 flex gap-6 items-start">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary shrink-0">
                  <Info className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Fleet Financing</h3>
                  <p className="text-muted-foreground text-sm">Institutional-grade financing options available for logistics partners through our network of partner banks.</p>
                  <Button variant="link" className="p-0 text-primary font-bold h-auto mt-2">Calculate Rates</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
