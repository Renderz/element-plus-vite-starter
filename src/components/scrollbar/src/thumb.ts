import type { ExtractPropTypes } from 'vue';
import { buildProps } from '../utils';

export const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
} as const);
export type ThumbProps = ExtractPropTypes<typeof thumbProps>;
