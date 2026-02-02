import { Link } from 'react-router-dom';
import { BookOpen, Github, Heart, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl">LearnFree</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-4">
              100% free educational resources for everyone. No subscriptions, no ads, 
              no premium content. Just pure learning.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Resources
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-muted-foreground hover:text-primary transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <Link to="/resources?category=technology" className="text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/resources?category=exams" className="text-muted-foreground hover:text-primary transition-colors">
                  Exam Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources?category=health" className="text-muted-foreground hover:text-primary transition-colors">
                  Health & Wellness
                </Link>
              </li>
              <li>
                <Link to="/resources?category=skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Soft Skills
                </Link>
              </li>
              <li>
                <Link to="/resources?category=community" className="text-muted-foreground hover:text-primary transition-colors">
                  Community Learning
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LearnFree. Free forever.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> for learners everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
