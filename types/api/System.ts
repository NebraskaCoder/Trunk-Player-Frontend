export interface System {
  UUID: string;
  name: string;
  systemACL: string;
  rr_system_id?: string;
  enable_talkgroup_acls: boolean;
  prune_transmissions: boolean;
  prune_transmissions_after_days: number;
  notes: string;
}
