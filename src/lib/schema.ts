import { z } from 'zod';

const SocialLink = z.object({
  platform: z.string(),
  url: z.string().url(),
  label: z.string().optional(),
});

const SkillGroup = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

const WorkExperience = z.object({
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

const Project = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url().optional(),
  repo: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
});

const Education = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  notes: z.string().optional(),
});

const Certification = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  url: z.string().url().optional(),
});

export const configSchema = z.object({
  site: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    ogImage: z.string().optional(),
  }),
  profile: z.object({
    name: z.string(),
    headline: z.string(),
    summary: z.string(),
    location: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
  social: z.array(SocialLink).optional(),
  skills: z.array(SkillGroup).optional(),
  experience: z.array(WorkExperience).optional(),
  projects: z.array(Project).optional(),
  education: z.array(Education).optional(),
  certifications: z.array(Certification).optional(),
  resume: z
    .object({
      path: z.string(),
      label: z.string().optional(),
    })
    .optional(),
  settings: z.object({
    layout: z.enum(['minimal', 'engineer']).default('minimal'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    sections: z.array(z.string()).optional(),
  }),
});

export type Config = z.infer<typeof configSchema>;
export type SocialLink = z.infer<typeof SocialLink>;
export type SkillGroup = z.infer<typeof SkillGroup>;
export type WorkExperience = z.infer<typeof WorkExperience>;
export type Project = z.infer<typeof Project>;
export type Education = z.infer<typeof Education>;
export type Certification = z.infer<typeof Certification>;
