const requireAll = requireContext => requireContext.keys().map(requireContext);
const svgs = require.context("@/assets/svg", false, /\.svg$/);
requireAll(svgs);