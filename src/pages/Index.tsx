import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  StickyNote, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users,
  Check,
  Star
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen gradient-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-3xl mb-8 shadow-strong">
              <StickyNote className="w-10 h-10 text-white" />
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Your Digital
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                {" "}Notes Hub
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Capture, organize, and access your thoughts from anywhere. 
              The simple yet powerful way to manage your personal notes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                asChild 
                size="lg" 
                className="btn-primary text-lg px-8 py-4 shadow-medium"
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 transition-smooth"
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="ml-2">Trusted by thousands of users worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need for note-taking
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and designed for productivity. Manage your notes with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-soft border-0 note-card">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Create, edit, and search through your notes instantly. No delays, no waiting.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft border-0 note-card">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Your notes are encrypted and stored securely. Only you have access to your data.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft border-0 note-card">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Easy to Use</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Intuitive interface designed for everyone. Start organizing your thoughts immediately.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Why choose Notes Manager?
              </h2>
              <p className="text-xl text-muted-foreground">
                Built for modern note-takers who value simplicity and efficiency
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'Create unlimited notes',
                'Search through all your content',
                'Edit and update anytime',
                'Secure user authentication',
                'Clean, distraction-free interface',
                'Access from any device'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to get organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already simplified their note-taking workflow
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="btn-primary text-lg px-8 py-4 shadow-medium"
          >
            <Link to="/register">
              Start Taking Notes Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <StickyNote className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Notes Manager</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and modern web technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
