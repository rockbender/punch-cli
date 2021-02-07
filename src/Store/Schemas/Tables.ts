import { SessionSchema, SessionLogSchema, HealthCheckSchema } from "./Schemas";

export class Table {
  public Name: string;
  public Schema: string;

  constructor(name: string, schema: string) {
    this.Name = name;
    this.Schema = schema;
  }
}

export abstract class DbTables {
  public static Session = new Table("Session", SessionSchema);
  public static SessionLog = new Table("SessionLog", SessionLogSchema);
  public static HealthCheck = new Table("HealthCheck", HealthCheckSchema);
}
