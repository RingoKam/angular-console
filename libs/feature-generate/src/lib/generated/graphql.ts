/* tslint:disable */

export enum FileType {
  file = 'file',
  directory = 'directory',
  angularDirectory = 'angularDirectory'
}

export namespace Generate {
  export type Variables = {
    path: string;
    genCommand: (string | null)[];
    dryRun: boolean;
  };

  export type Mutation = {
    __typename?: 'Mutation';
    generate?: Generate | null;
  };

  export type Generate = {
    __typename?: 'CommandStarted';
    id: string;
  };
}

export namespace SchematicCollectionsByName {
  export type Variables = {
    path: string;
    collection: string;
    schematic: string;
  };

  export type Query = {
    __typename?: 'Query';
    workspace: Workspace;
  };

  export type Workspace = {
    __typename?: 'Workspace';
    schematicCollections?: (SchematicCollections | null)[] | null;
  };

  export type SchematicCollections = {
    __typename?: 'SchematicCollection';
    schematics?: (Schematics | null)[] | null;
  };

  export type Schematics = {
    __typename?: 'Schematic';
    collection: string;
    name: string;
    description?: string | null;
    schema?: (Schema | null)[] | null;
  };

  export type Schema = {
    __typename?: 'SchematicSchema';
    name: string;
    enum?: (string | null)[] | null;
    type: string;
    description?: string | null;
    defaultValue?: string | null;
    required: boolean;
    positional: boolean;
  };
}

export namespace SchematicCollections {
  export type Variables = {
    path: string;
  };

  export type Query = {
    __typename?: 'Query';
    workspace: Workspace;
  };

  export type Workspace = {
    __typename?: 'Workspace';
    schematicCollections?: (SchematicCollections | null)[] | null;
  };

  export type SchematicCollections = {
    __typename?: 'SchematicCollection';
    name: string;
    schematics?: (Schematics | null)[] | null;
  };

  export type Schematics = {
    __typename?: 'Schematic';
    name: string;
    description?: string | null;
    collection: string;
  };
}

import { Injectable } from '@angular/core';

import * as Apollo from 'apollo-angular';

import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GenerateGQL extends Apollo.Mutation<
  Generate.Mutation,
  Generate.Variables
> {
  document: any = gql`
    mutation Generate(
      $path: String!
      $genCommand: [String]!
      $dryRun: Boolean!
    ) {
      generate(path: $path, genCommand: $genCommand, dryRun: $dryRun) {
        id
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class SchematicCollectionsByNameGQL extends Apollo.Query<
  SchematicCollectionsByName.Query,
  SchematicCollectionsByName.Variables
> {
  document: any = gql`
    query SchematicCollectionsByName(
      $path: String!
      $collection: String!
      $schematic: String!
    ) {
      workspace(path: $path) {
        schematicCollections(name: $collection) {
          schematics(name: $schematic) {
            collection
            name
            description
            schema {
              name
              enum
              type
              description
              defaultValue
              required
              positional
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class SchematicCollectionsGQL extends Apollo.Query<
  SchematicCollections.Query,
  SchematicCollections.Variables
> {
  document: any = gql`
    query SchematicCollections($path: String!) {
      workspace(path: $path) {
        schematicCollections {
          name
          schematics {
            name
            description
            collection
          }
        }
      }
    }
  `;
}
