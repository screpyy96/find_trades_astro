// Centralized icon imports for better tree shaking
// This file should be the only place where we import from lucide-react
// This enables better tree shaking and reduces bundle size
// Vercel build fix - ensure this file is included in deployment

// Lucide icons (tree-shaken by single entry file)
export {
  // Navigation icons
  Home, Menu, Search, ChevronDown, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight,

  // User/Auth icons
  User, UserCircle, UserPlus, UserCheck, LogIn, LogOut, Settings,

  // Dashboard icons
  LayoutDashboard, Briefcase, FileText, Info, Mail, Bell, BellOff,
  Calendar, CalendarDays, Clock, Eye, Phone, MapPin, Star, Heart,
  Trash2, ExternalLink, CheckCircle, XCircle, AlertCircle, TrendingUp,
  Coins, Award, Shield, ShieldCheck, Users, PlusCircle, CreditCard,
  Crown, Zap, Camera, X, Check, Save, MessageSquare, MessageCircle, Handshake,
  Rocket, BarChart3, GraduationCap, Facebook, Instagram, BookOpen,
  Grid3X3, Send, Image, Filter, Loader2, MoreHorizontal, Pencil, Plus,
  Edit, DollarSign, Tag, Upload, PenTool, Trophy, List, Badge, Share2,
  Wrench, Ruler, Clock3, Lock, Sparkles, Linkedin, Minimize2, Maximize2,
  ArrowUp, Paperclip, Flag, AlertTriangle,
  // Additional icons for homepage and SEO sections
  Paintbrush, Hammer, ListChecks, HelpCircle,

  // Aliased icons (ensure base names are only listed once above)
  Search as HeroSearch,
  Star as HeroStar,
  Briefcase as HeroBriefcase,
  Bell as HeroBell,
  CheckCircle as HeroCheckCircle,
  PlusCircle as HeroPlusCircle,

  ArrowRight as HomeArrowRight,
  Rocket as HomeRocket,
  Users as HomeUsers,
  Award as HomeAward,
  ShieldCheck as HomeShieldCheck,
  Star as HomeStar,
  Users as HomeUsersIcon,
  BarChart3 as HomeBarChart3,
  Shield as HomeShield,
  TrendingUp as HomeTrendingUp,
  Zap as HomeZap,
  Star as HomeStarIcon,
  MessageSquare as HomeMessageSquare,
  CreditCard as HomeCreditCard,
  Search as HomeSearch,
  MessageCircle as HomeMessageCircle,
  Handshake as HomeHandshake,
  ArrowRight as HomeArrowRightIcon
} from 'lucide-react';

// Font Awesome: recommend importing only used icons at call sites to enable treeshaking.
// Do not re-export FA icons from here to avoid bundling extras.
