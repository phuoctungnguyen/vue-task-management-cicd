export type TodoStatus = "active" | "completed";

export interface TodoProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class Todo {
  public readonly id: string;
  public readonly title: string;
  public readonly description?: string;
  public readonly completed: boolean;
  public readonly dueDate?: Date;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: TodoProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed;
    this.dueDate = props.dueDate ? new Date(props.dueDate) : undefined;
    this.createdAt = props.createdAt ? new Date(props.createdAt) : undefined;
    this.updatedAt = props.updatedAt ? new Date(props.updatedAt) : undefined;
  }

  public isExpired(reference: Date = new Date()): boolean {
    if (!this.dueDate || this.completed) {
      return false;
    }

    return this.dueDate.getTime() < reference.getTime();
  }

  public getFormattedDate(locale: string = "en-GB"): string {
    if (!this.dueDate) {
      return "No deadline";
    }

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(this.dueDate);
  }

  public getStatus(): TodoStatus {
    return this.completed ? "completed" : "active";
  }
}
