// FontAwesome configuration for optimal tree-shaking
import { config } from '@fortawesome/fontawesome-svg-core';

// Prevent FontAwesome from adding its CSS since we want to control it
config.autoAddCss = false;

export default config;