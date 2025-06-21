import { ValueOf } from 'src/shared/types/common';

export const CaslAction = {
    Manage: 'manage',
    Create: 'create',
    Read: 'read',
    Update: 'update',
    Delete: 'delete',
} as const;

export type CaslActionType = ValueOf<typeof CaslAction>;
