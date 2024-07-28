import groq from "groq";

export const allProjectsQuery = groq`*[_type == "project"]`;
