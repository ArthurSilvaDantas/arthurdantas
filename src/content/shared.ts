import type { Profile, SectionId, Tech } from '@/src/types';

export const sectionIds: readonly SectionId[] = ['inicio', 'sobre', 'skills', 'experiencia', 'projetos', 'contato'];

export const profiles = {
  github: { name: 'GitHub', href: 'https://github.com/ArthurSilvaDantas' },
  linkedin: { name: 'LinkedIn', href: 'https://www.linkedin.com/in/arthursdantas/' },
  huggingFace: { name: 'Hugging Face', href: 'https://huggingface.co/arthursilvadantas' },
} satisfies Record<string, Profile>;

export const techStack: Tech[] = [
  { name: 'Python', icon: 'python' },
  { name: 'PyTorch', icon: 'pytorch' },
  { name: 'TensorFlow', icon: 'tensorflow' },
  { name: 'Keras', icon: 'keras' },
  { name: 'scikit-learn', icon: 'scikit-learn' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'Pandas', icon: 'pandas', iconDark: 'pandas-dark' },
  { name: 'Jupyter', icon: 'jupyter' },
  { name: 'Label Studio', icon: 'label-studio' },
  { name: 'Hugging Face', icon: 'hugging-face' },
  { name: 'OpenCV', icon: 'opencv' },
  { name: 'Elasticsearch', icon: 'elasticsearch' },
  { name: 'Qdrant', icon: 'qdrant' },
  { name: 'Neo4j', icon: 'neo4j' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'Airflow', icon: 'airflow' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Kubernetes', icon: 'kubernetes' },
  { name: 'AWS', icon: 'aws', iconDark: 'aws-dark' },
  { name: 'GitHub Actions', icon: 'github-actions' },
  { name: 'Prometheus', icon: 'prometheus' },
  { name: 'Grafana', icon: 'grafana' },
  { name: 'Linux', icon: 'linux' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Redis', icon: 'redis' },
  { name: 'RabbitMQ', icon: 'rabbitmq' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Java', icon: 'java' },
  { name: 'Git', icon: 'git' },
];

export const projectLinks = {
  'jarvis-academico': { github: 'https://github.com/ArthurSilvaDantas/jarvis-academico' },
  'rag-stj': { github: 'https://github.com/ArthurSilvaDantas/rag-sumulas-stj' },
  'deteccao-sonolencia': {
    github: 'https://github.com/ArthurSilvaDantas/drowsiness-detection-landmarks',
    huggingFace: 'https://huggingface.co/arthursilvadantas/drowsiness-detection-landmarks',
    demo: 'https://huggingface.co/spaces/arthursilvadantas/drowsiness-detection-demo',
  },
  inithub: { github: 'https://github.com/engsoft-pantanal-dev/inithub' },
  notavelai: {
    github: 'https://github.com/ArthurSilvaDantas/NotavelAI-Android',
    huggingFace: 'https://huggingface.co/arthursilvadantas/NotavelAI',
  },
  svhn: {
    github: 'https://github.com/ArthurSilvaDantas/svhn-digits',
    huggingFace: 'https://huggingface.co/arthursilvadantas/SVHN',
  },
};
