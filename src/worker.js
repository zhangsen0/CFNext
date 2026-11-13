// ============================================================================
//  CFNext Worker 入口（薄包装）
// ----------------------------------------------------------------------------
//  部分 Cloudflare 账户把 CFNext 单文件（约 428 KiB）直接作为 Worker 入口时，
//  会出现启动异常（522 / 1101）。改为动态 import 让主体作为独立模块加载可规避。
//  同理不导出 scheduled handler（BESTIP_AUTO 定时优选为可选功能，默认关闭）。
// ============================================================================
export default {
  async fetch(request, env, ctx) {
    const mod = await import('./cfnext.js');
    return mod.default.fetch(request, env, ctx);
  }
};
