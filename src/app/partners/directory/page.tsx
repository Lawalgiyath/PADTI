
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Heart, 
  Share2, 
  Building2, 
  MapPin, 
  Truck, 
  Scale, 
  Building, 
  ExternalLink,
  Briefcase,
  Users
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PARTNER_DATA = [
  { 
    id: "p1", 
    name: "DHL Global", 
    type: "Logistics", 
    location: "Bonn, DE", 
    logo: "DH", 
    listings: 14, 
    likes: 245,
    description: "Global leader in express shipping and logistics services across 220+ countries."
  },
  { 
    id: "p2", 
    name: "AXA Insurance", 
    type: "Insurance", 
    location: "Paris, FR", 
    logo: "AX", 
    listings: 4, 
    likes: 128,
    description: "Providing innovative insurance instruments specifically designed for articulated professionals."
  },
  { 
    id: "p3", 
    name: "Scania Group", 
    type: "Manufacturer", 
    location: "Södertälje, SE", 
    logo: "SG", 
    listings: 8, 
    likes: 312,
    description: "World-leading provider of transport solutions, including trucks and buses for heavy transport."
  },
  { 
    id: "p4", 
    name: "Maersk Line", 
    type: "Logistics", 
    location: "Copenhagen, DK", 
    logo: "ML", 
    listings: 22, 
    likes: 410,
    description: "Integrated container logistics company and the largest container ship operator in the world."
  },
  { 
    id: "p5", 
    name: "EU Logistics Council", 
    type: "Institutional", 
    location: "Brussels, BE", 
    logo: "EU", 
    listings: 0, 
    likes: 89,
    description: "Strategic body facilitating cross-border logistics standards and professional mobility in Europe."
  },
  { 
    id: "p6", 
    name: "Volvo Trucks", 
    type: "Manufacturer", 
    location: "Gothenburg, SE", 
    logo: "VT", 
    listings: 12, 
    likes: 275,
    description: "Driving progress through high-quality, safe and environmentally friendly articulated vehicles."
  },
];

export default function PartnerDirectoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [likedPartners, setLikedPartners] = useState<Set<string>>(new Set());

  const categories = ["All", "Logistics", "Insurance", "Manufacturer", "Institutional"];

  const filteredPartners = PARTNER_DATA.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedPartners);
    if (newLiked.has(id)) newLiked.delete(id);
    else newLiked.add(id);
    setLikedPartners(newLiked);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-extrabold text-primary font-headline mb-2">Partner Network Directory</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Explore the global institutions, fleets, and manufacturers driving the future of articulated logistics.
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 font-bold rounded-xl h-12 px-8 shadow-lg" asChild>
                <Link href="/auth/signup?role=employer">Become a Partner</Link>
              </Button>
            </div>

            {/* Controls */}
            <Card className="border-none shadow-sm rounded-[24px] overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Search by institution name or location..." 
                      className="pl-10 h-12 rounded-xl border-secondary"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={filter === cat ? "default" : "outline"}
                        onClick={() => setFilter(cat)}
                        className={cn(
                          "rounded-xl h-12 px-6 font-bold transition-all",
                          filter === cat ? "bg-primary shadow-md" : "bg-white border-secondary hover:bg-secondary/20"
                        )}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPartners.map((partner) => (
                <Card key={partner.id} className="border-none shadow-sm hover:shadow-xl transition-all group rounded-[32px] overflow-hidden flex flex-col bg-white">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-primary/10 text-primary font-bold w-16 h-16 rounded-[20px] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {partner.logo}
                      </div>
                      <Badge variant="secondary" className="bg-secondary text-primary font-bold px-3 py-1 uppercase tracking-widest text-[10px]">
                        {partner.type === 'Logistics' && <Truck className="h-3 w-3 mr-1" />}
                        {partner.type === 'Insurance' && <Scale className="h-3 w-3 mr-1" />}
                        {partner.type === 'Manufacturer' && <Truck className="h-3 w-3 mr-1" />}
                        {partner.type === 'Institutional' && <Building className="h-3 w-3 mr-1" />}
                        {partner.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{partner.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 font-medium mt-1">
                      <MapPin className="h-4 w-4" /> {partner.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {partner.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 border-y py-4 border-secondary/50">
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">{partner.listings}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Listings</p>
                      </div>
                      <div className="text-center border-l border-secondary/50">
                        <p className="text-xl font-bold text-primary">{partner.likes + (likedPartners.has(partner.id) ? 1 : 0)}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Network Score</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      className={cn(
                        "flex-1 rounded-xl h-11 font-bold gap-2 transition-colors",
                        likedPartners.has(partner.id) ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" : "hover:bg-secondary/20"
                      )}
                      onClick={() => toggleLike(partner.id)}
                    >
                      <Heart className={cn("h-4 w-4", likedPartners.has(partner.id) && "fill-current")} /> Like
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold gap-2 hover:bg-secondary/20">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                    <Button className="flex-none rounded-xl h-11 px-4 bg-primary hover:bg-primary/90" title="View Profile">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[32px] shadow-sm">
                <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-muted-foreground">No partners found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                <Button variant="link" className="text-primary font-bold mt-4" onClick={() => {setSearch(""); setFilter("All");}}>
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Ecosystem CTA */}
            <Card className="bg-primary text-white border-none shadow-xl rounded-[40px] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Users className="h-48 w-48" />
              </div>
              <CardContent className="p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-3xl font-bold">Connect Your Institution</h2>
                  <p className="text-white/80 text-lg max-w-xl">
                    Whether you're an employer, insurer, or equipment provider, the PADTI Partner Network is your gateway to global logistics excellence.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-10 py-7 text-lg font-bold border-none shadow-lg">
                    Integration API
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl px-10 py-7 text-lg font-bold border-none">
                    Contact Network Lead
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
