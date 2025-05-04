import { Project } from '../../types/project';

/**
 * Filters projects based on technology and search query
 * @param projects Array of projects to filter
 * @param filter Technology filter (optional)
 * @param searchQuery Search text (optional)
 * @returns Filtered array of projects
 */
export const filterProjects = (
  projects: Project[],
  filter: string | null,
  searchQuery: string
): Project[] => {
  return projects.filter(project => {
    // Filter by technology if a filter is selected
    const matchesTech = filter ? project.technologies.includes(filter) : true;
    
    // Filter by search query
    const matchesSearch = searchQuery 
      ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesTech && matchesSearch;
  });
};

/**
 * Extracts unique technologies from project array
 * @param projects Array of projects
 * @returns Array of unique technology strings
 */
export const getUniqueTechnologies = (projects: Project[]): string[] => {
  return Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );
};
