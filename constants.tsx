
import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Monitor, 
  Workflow, 
  Users, 
  Lightbulb,
  GraduationCap,
  Briefcase,
  Trophy,
  MapPin,
  Bus,
  Coffee
} from 'lucide-react';
import { Skill, Benefit } from './types.ts';

export const SKILLS: Skill[] = [
  {
    title: "App Building",
    description: "Learn basic to intermediate application construction.",
    icon: "Code2"
  },
  {
    title: "Mobile & Web",
    description: "Full-stack development for modern platforms.",
    icon: "Smartphone"
  },
  {
    title: "Windows Apps",
    description: "Desktop software architecture and building.",
    icon: "Monitor"
  },
  {
    title: "Automation",
    description: "Workflow creation and business process automation.",
    icon: "Workflow"
  },
  {
    title: "Soft Skills",
    description: "Professional communication and teamwork mastery.",
    icon: "Users"
  },
  {
    title: "Problem Solving",
    description: "Logical thinking and practical engineering mindsets.",
    icon: "Lightbulb"
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: "Monthly Stipend",
    description: "Performance-based earnings while you learn.",
    icon: "Briefcase"
  },
  {
    title: "Certifications",
    description: "Official experience letter and skill certificates.",
    icon: "Trophy"
  },
  {
    title: "Live Projects",
    description: "Work on real-world industrial applications.",
    icon: "GraduationCap"
  }
];

export const PERKS = [
  { label: "Transportation", icon: <Bus className="w-5 h-5" /> },
  { label: "Daily Meals", icon: <Coffee className="w-5 h-5" /> },
  { label: "Remote (Lucknow)", icon: <MapPin className="w-5 h-5" /> }
];

export const getIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6" />,
    Smartphone: <Smartphone className="w-6 h-6" />,
    Monitor: <Monitor className="w-6 h-6" />,
    Workflow: <Workflow className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Lightbulb: <Lightbulb className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
    Trophy: <Trophy className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />
  };
  return icons[iconName] || <Code2 />;
};
