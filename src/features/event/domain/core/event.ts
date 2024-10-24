import { Core } from '@/common/domain/core/core';

export type EventProps = {
  description: string;
  active: boolean;
  createdAt?: Date;
};

export class Event extends Core<EventProps> {
  constructor(
    public readonly props: EventProps,
    uuid?: string,
  ) {
    super(props, uuid);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get description(): string {
    return this.props.description;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set active(active: boolean) {
    this.props.active = active;
  }

  static async create(props: EventProps, uuid?: string): Promise<Event> {
    return new this(props, uuid);
  }
}
