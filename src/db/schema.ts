"use client";

import Dexie, { type EntityTable } from "dexie";

// Repository is a destination for a contribution (e.g. working out, reading, going walks, etc.)
export type Repository = {
  id: number;
  name: string;
  createdAt: Date;
};

// Commit is a single instance of contribution to a repository (e.g. a workout, a book, a walk, etc.)
export type Commit = {
  id: number;
  repositoryId: number;
  createdAt: Date;
  contribution: number;
};

const db = new Dexie("inertia") as Dexie & {
  repositories: EntityTable<Repository, "id">;
  commits: EntityTable<Commit, "id">;
};

db.version(1).stores({
  repositories: "++id, name, createdAt",
  commits: "++id, repositoryId, createdAt, contribution",
});

export default db;
