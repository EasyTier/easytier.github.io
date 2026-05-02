<script setup lang="ts">
import { useData } from 'vitepress'

const { lang } = useData()
const isEn = lang.value === 'en'
</script>

<template>
  <div class="et-web-redirect">
    <div class="bg-orb bg-orb-1" />
    <div class="bg-orb bg-orb-2" />

    <div class="card">
      <div class="logo-wrap">
        <img src="/easytier.png" alt="EasyTier" class="logo">
      </div>

      <h1 v-if="isEn">
        Web Console Service Unavailable
      </h1>
      <h1 v-else>
        Web 控制台服务迁移
      </h1>
      <p v-if="isEn" class="subtitle">
        EasyTier Web Console Service Update
      </p>
      <p v-else class="subtitle">
        EasyTier Web Console Service Migration
      </p>

      <div class="divider" />

      <div class="notice">
        <div class="notice-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div v-if="isEn" class="notice-title">
          Service Update
        </div>
        <div v-else class="notice-title">
          服务调整通知
        </div>
        <div v-if="isEn" class="notice-text">
          Due to compliance requirements <strong>applicable in mainland China only</strong>, the EasyTier open-source project does not provide official Web server hosting services. Core networking features do not rely on Web management and can be fully used via CLI or GUI. The Web console source code is fully open; you are welcome to self-host. For third-party hosting services, please use the link below.
        </div>
        <div v-else class="notice-text">
          EasyTier 开源项目因合规原因，暂不提供官方 Web 服务器托管服务。<strong>核心组网功能不依赖 Web 管理</strong>，通过 CLI 或 GUI 即可完整使用。Web 控制台源码已完全开放，欢迎自行部署；如需第三方托管服务，也可通过下方入口了解。
        </div>
      </div>

      <a href="https://console.easytier.net" class="cta" target="_blank" rel="noopener">
        <template v-if="isEn">
          Learn More About Web Console Hosting
        </template>
        <template v-else>
          了解 Web 控制台托管服务
        </template>
        <svg class="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>

      <div class="footer">
        <a href="https://console.easytier.net" target="_blank" rel="noopener">console.easytier.net</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.et-web-redirect {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
  background: linear-gradient(135deg, #f0f9f6 0%, #e0f2ed 100%);
  overflow: hidden;
  z-index: 9999;
}

@media (prefers-color-scheme: dark) {
  .et-web-redirect {
    background: linear-gradient(135deg, #0f1c19 0%, #152621 100%);
  }
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: et-web-float 20s ease-in-out infinite;
  pointer-events: none;
}

.bg-orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #05b08e 0%, transparent 70%);
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.bg-orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #3dd1b3 0%, transparent 70%);
  bottom: -80px;
  left: -80px;
  animation-delay: -10s;
}

@keyframes et-web-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.card {
  position: relative;
  z-index: 1;
  max-width: 520px;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 56px 40px;
  text-align: center;
  box-shadow:
    0 4px 6px -1px rgba(5, 176, 142, 0.08),
    0 10px 15px -3px rgba(5, 176, 142, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: et-web-cardEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@media (prefers-color-scheme: dark) {
  .card {
    background: rgba(30, 41, 38, 0.7);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.25),
      0 10px 15px -3px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
}

@keyframes et-web-cardEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 28px;
}

.logo-wrap::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #05b08e 0%, #3dd1b3 100%);
  opacity: 0.12;
  animation: et-web-pulse 3s ease-in-out infinite;
}

@keyframes et-web-pulse {
  0%, 100% { transform: scale(1); opacity: 0.12; }
  50% { transform: scale(1.08); opacity: 0.2; }
}

.logo {
  width: 72px;
  height: 72px;
  position: relative;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(5, 176, 142, 0.25);
}

h1 {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  border: none;
  padding: 0;
}

@media (prefers-color-scheme: dark) {
  h1 {
    color: #e8f0ed;
  }
}

.subtitle {
  font-size: 15px;
  color: #718096;
  margin-bottom: 32px;
  font-weight: 400;
}

@media (prefers-color-scheme: dark) {
  .subtitle {
    color: #6b8a80;
  }
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #05b08e, transparent);
  opacity: 0.25;
  margin: 28px 0;
}

.notice {
  background: linear-gradient(135deg, rgba(5, 176, 142, 0.06) 0%, rgba(61, 209, 179, 0.06) 100%);
  border: 1px solid rgba(5, 176, 142, 0.12);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: left;
}

.notice-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #05b08e 0%, #048a6f 100%);
  border-radius: 10px;
  margin-bottom: 14px;
  color: white;
  font-size: 16px;
}

.notice-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 8px;
}

@media (prefers-color-scheme: dark) {
  .notice-title {
    color: #e8f0ed;
  }
}

.notice-text {
  font-size: 14px;
  line-height: 1.7;
  color: #4a5568;
}

@media (prefers-color-scheme: dark) {
  .notice-text {
    color: #a0b5ae;
  }
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #05b08e 0%, #048a6f 100%);
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(5, 176, 142, 0.35);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(5, 176, 142, 0.45);
}

.cta:hover::before {
  opacity: 1;
}

.cta:active {
  transform: translateY(0);
}

.cta-arrow {
  transition: transform 0.3s ease;
}

.cta:hover .cta-arrow {
  transform: translateX(3px);
}

.footer {
  margin-top: 24px;
  font-size: 13px;
  color: #718096;
}

@media (prefers-color-scheme: dark) {
  .footer {
    color: #6b8a80;
  }
}

.footer a {
  color: #05b08e;
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .card {
    padding: 40px 24px;
    border-radius: 20px;
    margin: 16px;
  }
  h1 {
    font-size: 22px;
  }
  .logo {
    width: 60px;
    height: 60px;
  }
}
</style>
