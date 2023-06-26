import Categories from "@/Components/Categories";
import ProjectCard from "@/Components/ProjectCard";
import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type Props = {
  searchParams: {
    category: string | null;
  };
};

const Home = async ({ searchParams: { category } }: Props) => {
  const data = (await fetchAllProjects(category)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <>
        <section className="flexStart flex-col paddings ">
          <Categories />
          <p className="no-result-text text-center">
            No projects found, go create some first.
          </p>
        </section>
      </>
    );
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>
      <h1>Loadmore</h1>
    </section>
  );
};

export default Home;