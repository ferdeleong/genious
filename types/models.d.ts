type CourseType = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  UserId: string;
};

type ArtifactType = {
  id: string;
  name: string;
  type: string;
  url: string;
  CourseId: string;
};
