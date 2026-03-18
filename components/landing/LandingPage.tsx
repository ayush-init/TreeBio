import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, BarChart3, Palette, Share2, Fingerprint, Users, TrendingUp, Calendar, Mail, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">New: Advanced Analytics 2.0</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              Share Everything <br /> <span className=" text-[#FFA116]">With One Link</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              The only link you&apos;ll ever need to power your online presence. Connect your audience to all your content with a beautiful, high-converting bio page.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-background bg-[#FFA116] overflow-hidden"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-[#41B313] overflow-hidden"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-500 overflow-hidden"></div>
              </div>
              <span>Joined by 50,000+ creators this month</span>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[600px] bg-muted rounded-[3rem] border-[8px] border-border shadow-2xl overflow-hidden group">
              <div className="absolute top-0 w-full h-full bg-gradient-to-b from-primary/5 to-muted/50"></div>
              <div className="relative p-6 flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-muted border-2 border-primary/30 mt-8 overflow-hidden"></div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">Ayush Chaurasiya</h3>
                  <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full py-3 bg-card/5 border border-border rounded-xl text-center text-sm font-medium hover:bg-card/10 transition-colors cursor-pointer">Latest YouTube Video</div>
                  <div className="w-full py-3 bg-card/5 border border-border rounded-xl text-center text-sm font-medium hover:bg-card/10 transition-colors cursor-pointer">My Gear Setup</div>
                  <div className="w-full py-3 bg-primary/20 border border-primary/40 rounded-xl text-center text-sm font-bold text-primary cursor-pointer">Shop New Merch</div>
                  <div className="w-full py-3 bg-card/5 border border-border rounded-xl text-center text-sm font-medium hover:bg-card/10 transition-colors cursor-pointer">Newsletter Signup</div>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">IG</div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">TW</div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">TK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-card/30" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Powerful features designed to help you monetize your audience and grow your digital footprint.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Custom Link Pages</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Design a page that truly reflects your unique brand identity with deep customization.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Social Integrations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Connect all your social platforms seamlessly with native API integrations.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Track every click and view with real-time data and geographic insights.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <Fingerprint className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Custom Branding</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Remove TreeBio logos and use your own custom domain for full control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Examples */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-3xl font-black">Built for Every Creator</h2>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-8 px-6">
          <div className="min-w-[280px] h-[500px] rounded-3xl bg-gradient-to-br from-blue-900/20 to-card p-6 border border-border flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-muted overflow-hidden ring-4 ring-blue-500/30"></div>
            <div className="text-center">
              <p className="font-bold text-foreground">@designer</p>
              <p className="text-xs text-blue-400">Visual Artist</p>
            </div>
            <div className="w-full space-y-3">
              <div className="h-10 w-full bg-card/5 rounded-lg border border-border flex items-center justify-center text-sm">Portfolio 2024</div>
              <div className="h-10 w-full bg-card/5 rounded-lg border border-border flex items-center justify-center text-sm">Behance Case Studies</div>
              <div className="h-24 w-full bg-card/5 rounded-lg border border-border grid grid-cols-2 gap-2 p-2">
                <div className="bg-card/10 rounded"></div>
                <div className="bg-card/10 rounded"></div>
              </div>
            </div>
          </div>
          <div className="min-w-[280px] h-[500px] rounded-3xl bg-gradient-to-br from-green-900/20 to-card p-6 border border-border flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-muted overflow-hidden ring-4 ring-green-500/30"></div>
            <div className="text-center">
              <p className="font-bold text-foreground">@developer</p>
              <p className="text-xs text-green-400">Software Engineer</p>
            </div>
            <div className="w-full space-y-3">
              <div className="h-10 w-full bg-muted/80 rounded-lg flex items-center gap-3 px-3 text-sm">
                <Github className="w-4 h-4" /> GitHub Projects
              </div>
              <div className="h-10 w-full bg-muted/80 rounded-lg flex items-center gap-3 px-3 text-sm">
                <Mail className="w-4 h-4" /> Tech Blog
              </div>
              <div className="h-10 w-full bg-muted/80 rounded-lg flex items-center gap-3 px-3 text-sm">
                <Twitter className="w-4 h-4" /> Buy Me a Coffee
              </div>
            </div>
          </div>
          <div className="min-w-[280px] h-[500px] rounded-3xl bg-gradient-to-br from-primary/20 to-card p-6 border border-border flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-muted overflow-hidden ring-4 ring-primary/30"></div>
            <div className="text-center">
              <p className="font-bold text-foreground">@creator</p>
              <p className="text-xs text-primary">Content Hub</p>
            </div>
            <div className="w-full space-y-3">
              <div className="h-32 w-full bg-muted/80 rounded-2xl overflow-hidden relative"></div>
              <div className="h-10 w-full bg-primary/20 text-primary font-bold rounded-lg flex items-center justify-center text-sm">Link in Bio Store</div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-24 bg-card" id="analytics">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative p-4 bg-muted/40 rounded-3xl border border-border backdrop-blur-sm">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-lg">Performance Overview</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-md bg-card/5 text-[10px] text-muted-foreground">7 Days</span>
                    <span className="px-2 py-1 rounded-md bg-card/5 text-[10px] text-muted-foreground">30 Days</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-card/5 rounded-xl">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Total Clicks</p>
                    <p className="text-2xl font-black text-blue-400">12,482</p>
                  </div>
                  <div className="p-4 bg-card/5 rounded-xl">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Conversion</p>
                    <p className="text-2xl font-black text-green-400">8.4%</p>
                  </div>
                </div>
                <div className="h-48 w-full flex items-end gap-2 px-2">

                  <div className="w-full bg-[#2563EB]/80 h-[40%] rounded-t-sm hover:bg-[#2563EB] transition"></div>

                  <div className="w-full bg-green-400/80 h-[65%] rounded-t-sm hover:bg-green-400 transition"></div>

                  <div className="w-full bg-[#FFA116]/80 h-[45%] rounded-t-sm hover:bg-[#FFA116] transition"></div>

                  <div className="w-full bg-[#2563EB]/80 h-[80%] rounded-t-sm hover:bg-[#2563EB] transition"></div>

                  <div className="w-full bg-[#FFA116]/80 h-[95%] rounded-t-sm border-t-2 hover:bg-[#FFA116]   border-orange-300"></div>

                  <div className="w-full bg-green-400/80  h-[60%] rounded-t-sm hover:bg-green-400  transition"></div>

                  <div className="w-full bg-[#2563EB]/80 h-[75%] rounded-t-sm hover:bg-[#2563EB] transition"></div>

                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Data That Drives <br /> <span className="text-[#FFA116]">Decisions</span></h2>
              <p className="text-muted-foreground leading-relaxed">Stop guessing what your audience likes. Get detailed insights into where your traffic comes from and which links are performing best.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Real-time link click tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Referrer sources & geographic data</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Weekly insights reports via email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Choose plan that&apos;s right for your creative journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border flex flex-col gap-6 relative overflow-hidden group">
              <div>
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-3xl font-black">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <p className="text-sm text-muted-foreground">Everything you need to get started with your online presence.</p>
              <div className="space-y-4 text-sm text-muted-foreground flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Unlimited Links
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Basic Analytics
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Standard Templates
                </div>
              </div>
              <Link href="/sign-up">
                <Button className="mt-auto w-full py-3 rounded-xl bg-card border border-border font-bold hover:bg-accent transition-colors">
                  Start for Free
                </Button>
              </Link>
            </div>
            <div className="p-8 rounded-3xl 
  bg-gradient-to-b from-[#2A1B0F] via-[#1A120B] to-[#0B0B0B]
  border border-orange-500/30 
  flex flex-col gap-6 relative overflow-hidden 
  scale-105 
  shadow-[0_0_40px_rgba(245,158,11,0.15)]">

              {/* Badge */}
              <div className="absolute top-4 right-4 
    bg-orange-500 text-black 
    text-[10px] font-black px-3 py-1 rounded-full 
    uppercase tracking-widest shadow-md">
                Most Popular
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
                <p className="text-3xl font-black text-orange-400">
                  $9
                  <span className="text-sm font-normal text-zinc-400">/mo</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400">
                Perfect for growing creators looking to level up their brand.
              </p>

              {/* Features */}
              <div className="space-y-4 text-sm text-zinc-300 flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Everything in Free
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Remove TreeBio Branding
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Advanced Analytics
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  Priority Support
                </div>
              </div>

              {/* Button */}
              <Link href="/sign-up">
                <Button className="mt-auto w-full py-3 rounded-xl     bg-orange-500 text-black font-black   shadow-lg shadow-orange-500/30     hover:scale-[1.02] hover:bg-orange-400 transition">
                  Get Pro Now
                </Button>
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border flex flex-col gap-6 relative overflow-hidden group">
              <div>
                <h3 className="text-xl font-bold mb-2">Creator</h3>
                <p className="text-3xl font-black">$24<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <p className="text-sm text-muted-foreground">The ultimate toolkit for agencies and professional digital creators.</p>
              <div className="space-y-4 text-sm text-muted-foreground flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Everything in Pro
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Custom Domain (tree.you.com)
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Team Management
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  API Access
                </div>
              </div>
              <Link href="/sign-up">
                <Button className="mt-auto w-full py-3 rounded-xl bg-card border border-border font-bold hover:bg-accent transition-colors">
                  Go Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

 

      {/* Footer */}
      <footer className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">🌳</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">TreeBio</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              The original and most popular link-in-bio tool used by creators, celebrities and top brands worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Product</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="hover:text-primary transition-colors">Templates</a>
              <a href="#" className="hover:text-primary transition-colors">Marketplace</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Support</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
              <a href="#" className="hover:text-primary transition-colors">API Docs</a>
              <a href="#" className="hover:text-primary transition-colors">Community</a>
              <a href="#" className="hover:text-primary transition-colors">System Status</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Company</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About Us</a>
              <a href="#" className="hover:text-primary transition-colors">Careers</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 TreeBio Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}