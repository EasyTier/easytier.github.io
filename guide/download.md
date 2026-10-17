---
home: hello
---

<script setup lang="ts">
import { computed, ref } from 'vue'
import { data } from '../metadata.data.js'
import { resolveDownloadUrl } from '../releaseUtils.ts'
import { useLatestVersion } from '../useLatestVersion.ts'

const { latestVersion, prereleaseVersion, latestRelease, prereleaseRelease, nightlyRelease, loading } = useLatestVersion()

interface Package {
    os: string
    arch: string
    gui_pkg_tmpl: Record<string, string>
    cli_pkg_tmpl: Record<string, string> // key: format, value: url
    comment?: string
}

function gen_pkg_without_gui(os: string, archs: string[]): Package[] {
    return archs.map(arch => {
        return {
            os,
            arch,
            gui_pkg_tmpl: {},
            cli_pkg_tmpl: {
                "zip": `https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-linux-${arch}-v{}.zip`,
            },
        }
    })
}

const packages = ref<Package[]>([
    {
        os: 'Windows',
        arch: 'x86_64',
        gui_pkg_tmpl: {
            "exe": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_x64-setup.exe'
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-windows-x86_64-v{}.zip'
        },
        comment: "Windows 7 需要是 SP1 及以上, 并且需要安装 KB3063858、KB4474419 这两个补丁，并关闭 QUIC 输入。"
    },
    {
        os: "Windows",
        arch: "arm64",
        gui_pkg_tmpl: {
            "exe": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_arm64-setup.exe'
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-windows-arm64-v{}.zip'
        },
    },
    {
        os: "Linux",
        arch: "x86_64",
        gui_pkg_tmpl: {
            "deb": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_amd64.deb',
            "AppImage": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_amd64.AppImage',
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-linux-x86_64-v{}.zip',
        },
    },
    {
        os: "Linux",
        arch: "aarch64",
        gui_pkg_tmpl: {
            "deb": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_arm64.deb',
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-linux-aarch64-v{}.zip',
        },
    },
    ...gen_pkg_without_gui("Linux", ["arm", "armhf", "armv7", "armv7hf", "mips", "mipsel"]),
    {
        os: "MacOS",
        arch: "x86_64",
        gui_pkg_tmpl: {
            "dmg": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_x64.dmg',
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-macos-x86_64-v{}.zip',
        },
        comment: "安装 GUI 后需要手动执行 xattr -c /Applications/easytier-gui.app, 否则会提示文件损坏"
    },
    {
        os: "MacOS",
        arch: "aarch64",
        gui_pkg_tmpl: {
            "dmg": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-gui_{}_aarch64.dmg',
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-macos-aarch64-v{}.zip',
        },
        comment: "安装 GUI 后需要手动执行 xattr -c /Applications/easytier-gui.app, 否则会提示文件损坏"
    },
    {
        os: "Android",
        arch: "arm64",
        gui_pkg_tmpl: {
            "apk": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/app-arm64-release.apk',
        },
        cli_pkg_tmpl: {},
        comment: "近十年内的安卓移动设备都可以选择此版本。遇到显示界面显示异常，请尝试升级 WebView"
    },
    {
        os: "Android",
        arch: "arm",
        gui_pkg_tmpl: {
            "apk": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/app-arm-release.apk',
        },
        cli_pkg_tmpl: {},
        comment: "较旧的安卓设备可以选择此版本。遇到显示界面显示异常，请尝试升级 WebView"
    },
    {
        os: "Android",
        arch: "x86_64",
        gui_pkg_tmpl: {
            "apk": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/app-x86_64-release.apk',
        },
        cli_pkg_tmpl: {},
        comment: "遇到显示界面显示异常，请尝试升级 WebView"
    },
    {
        os: "Android",
        arch: "x86",
        gui_pkg_tmpl: {
            "apk": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/app-x86-release.apk',
        },
        cli_pkg_tmpl: {},
        comment: "遇到显示界面显示异常，请尝试升级 WebView"
    },
    {
        os: "Android Magisk 面具模块",
        arch: "aarch64",
        gui_pkg_tmpl: {},
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/Easytier-Magisk-v{}.zip'
        },
        comment: "支持 Magisk/KernelSU/Apatch。会在开机后启动一个 easytier-core 实例，配置位于 /data/adb/modules/easytier_magisk/config/ 目录下"
    },
    {
        os: "FreeBSD 13.2",
        arch: "x86_64",
        gui_pkg_tmpl: {},
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/easytier-freebsd-13.2-x86_64-v{}.zip',
        },
    }
])

const all_archs = new Set(packages.value.map(pkg => pkg.arch))
const all_os = new Set(packages.value.map(pkg => pkg.os))
const all_proxy = new Set(data.github_accels)

const channel = ref('easytier_latest_version')

const url = 'https://github.com/EasyTier/EasyTier/releases/tag/'
const filter_os = ref('')
const filter_arch = ref('')
const accel_proxy = ref('')

const vers = computed(() => ({
    easytier_latest_version: latestVersion.value ?? data.easytier_latest_version,
    easytier_pre_release_version: prereleaseVersion.value ?? data.easytier_pre_release_version,
}))

const currentVersion = computed(() => vers.value[channel.value as keyof typeof vers.value])
const currentRelease = computed(() => {
    if (channel.value === 'nightly')
        return nightlyRelease.value
    return channel.value === 'easytier_latest_version' ? latestRelease.value : prereleaseRelease.value
})
const currentTag = computed(() => channel.value === 'nightly' ? 'nightly' : currentRelease.value?.tag_name ?? `v${currentVersion.value}`)
const currentTitle = computed(() => channel.value === 'nightly' ? 'Nightly' : currentTag.value)

function renderLinks(templates: Record<string, string>) {
    return Object.entries(templates).flatMap(([format, template]) => {
        const downloadUrl = resolveDownloadUrl(template, currentRelease.value, channel.value === 'nightly' ? undefined : currentVersion.value)
        return downloadUrl ? [{ format, url: accel_proxy.value + downloadUrl }] : []
    })
}

</script>

# 下载 { #download }

您可以直接前往 [GitHub Release 页面](https://github.com/EasyTier/EasyTier/releases) 查看所有版本的下载链接，或者使用下面的表格查找适合您的版本。

命令行程序的压缩包中包含四个可执行程序：

- `easytier-core`：EasyTier 的核心程序
- `easytier-cli`：EasyTier 管理程序，启动 easytier-core 后，可以使用 easytier-cli 查看虚拟网信息
- `easytier-web`: 用于自建 EasyTier 的 Web 控制台后端，一般情况下无需自建，使用官方提供的 Web 控制台即可
- `easytier-web-embed`: 与 `easytier-web` 功能相同，但内置了 Web 前端。

## 切换下载通道 { #channel }

<div>
    <select name="channel-select" id="channel-select" v-model="channel" class="filter-select">
        <option value="easytier_latest_version"> 稳定版(v{{ vers.easytier_latest_version }}) </option>
        <option value="easytier_pre_release_version"> 预发布版(v{{ vers.easytier_pre_release_version }}) </option>
        <option value="nightly"> 开发版（Nightly） </option>
    </select>
</div>

<p v-if="channel === 'nightly'">Nightly 跟随 main 分支更新，适合测试最新功能，可能不稳定。</p>

## <a :href="url + currentTag">EasyTier {{ currentTitle }}</a> { #latest }

<p v-if="channel === 'nightly' && !nightlyRelease?.assets.length">
    <span v-if="loading">正在加载 Nightly 下载文件…</span>
    <span v-else>暂时无法获取 Nightly 下载文件，请前往 <a :href="url + 'nightly'">Nightly 发布页</a>。</span>
</p>

- Github 加速
    <div>
        <select name="gh-accel-select" id="gh-accel-select" v-model="accel_proxy" class="filter-select">
            <option value=""> 直连 </option>
            <option v-for="p in all_proxy" :value="p"> {{ p }} </option>
        </select>
    </div>

- 根据操作系统筛选
    <div>
        <select name="os-select" id="os-select" v-model="filter_os" class="filter-select">
            <option value=""> 全部 </option>
            <option v-for="os in all_os" :value="os"> {{ os }} </option>
        </select>
    </div>

- 根据硬件架构筛选
    <div>
        <select name="arch-select" id="arch-select" v-model="filter_arch" class="filter-select">
            <option value=""> 全部 </option>
            <option v-for="arch in all_archs" :value="arch"> {{ arch }} </option>
        </select>
    </div>

<table v-if="channel !== 'nightly' || nightlyRelease?.assets.length">

<thead>
<tr>
<th> 操作系统 </th>
<th> 硬件架构 </th>
<th> 图形界面程序 GUI </th>
<th> 命令行程序 CLI </th>
<th> 注意事项 </th>
</tr>
</thead>

<tr v-for="pkg in packages" v-show="(!filter_os || pkg.os === filter_os) && (!filter_arch || pkg.arch === filter_arch)">

<td> {{ pkg.os }} </td>
<td> {{ pkg.arch }} </td>

<td>
<a v-for="link in renderLinks(pkg.gui_pkg_tmpl)" :key="link.format" class="download-link-span" :href="link.url">
{{link.format}}
</a>
</td>

<td>
<a v-for="link in renderLinks(pkg.cli_pkg_tmpl)" :key="link.format" class="download-link-span" :href="link.url">
{{link.format}}
</a>
</td>

<td>
{{ pkg.comment }}
</td>

</tr>

</table>
