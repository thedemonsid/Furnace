interface Project {
  name: string;
  description: string;
}

interface Column {
  name: string;
  color: string;
  dotColor: string;
  projects: Project[];
  sortOrder: number;
}
