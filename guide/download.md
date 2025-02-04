---
home: hello
---

<script setup lang="ts">
import { ref } from 'vue'
import { data } from '../metadata.data.js'

interface Package {
    os: string
    arch: string
    gui_pkg_tmpl: record<string, string>
    cli_pkg_tmpl: record<string, string> // key: format, value: url
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
        comment: "支持 Windows 8 及以上版本，Windows 7 仅支持 EasyTier v2.1.2 以下版本。"
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
        os: 'Windows 7',
        arch: 'x86_64',
        gui_pkg_tmpl: {
            "exe": 'https://github.com/EasyTier/EasyTier/releases/download/v2.1.2/easytier-gui_2.1.2_x64-setup.exe'
        },
        cli_pkg_tmpl: {
            "zip": 'https://github.com/EasyTier/EasyTier/releases/download/v2.1.2/easytier-windows-x86_64-v2.1.2.zip'
        },
        comment: "Windows 7 需要是 SP1 及以上, 并且需要安装 KB3063858、KB4474419 这两个补丁。此版本为 EasyTier v2.1.2 版本。"
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
        arch: "universal",
        gui_pkg_tmpl: {
            "apk": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/app-universal-release.apk',
        },
        cli_pkg_tmpl: {},
        comment: "遇到显示界面显示异常，请尝试升级 WebView"
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

const version = ref(data.easytier_latest_version)

const url = 'https://github.com/EasyTier/EasyTier/releases/tag/v'
const filter_os = ref('')
const filter_arch = ref('')
const accel_proxy = ref('')

function renderUrlTmpl(url_tmpl: string): string {
    return accel_proxy.value + url_tmpl.replace(/\{\}/g, version.value)
}

</script>

# 下载 { #download }

您可以直接前往 [GitHub Release 页面](https://github.com/EasyTier/EasyTier/releases) 查看所有版本的下载链接，或者使用下面的表格查找适合您的版本。

命令行程序的压缩包中包含三个可执行程序：

- `easytier-core`：EasyTier 的核心程序
- `easytier-cli`：EasyTier 管理程序，启动 easytier-core 后，可以使用 easytier-cli 查看虚拟网信息
- `easytier-web`: 用于自建 EasyTier 的 Web 控制台后端，一般情况下无需自建，使用官方提供的 Web 控制台即可

## <a :href="url + version">EasyTier v{{ version }}</a> { #latest }

- Github 加速
    <div>
        <select name="pets" id="gh-accel-select" v-model="accel_proxy" class="filter-select">
            <option value=""> 直连 </option>
            <option v-for="p in all_proxy" :value="p"> {{ p }} </option>
        </select>
    </div>

- 根据操作系统筛选
    <div>
        <select name="pets" id="os-select" v-model="filter_os" class="filter-select">
            <option value=""> 全部 </option>
            <option v-for="os in all_os" :value="os"> {{ os }} </option>
        </select>
    </div>

- 根据硬件架构筛选
    <div>
        <select name="pets" id="arch-select" v-model="filter_arch" class="filter-select">
            <option value=""> 全部 </option>
            <option v-for="arch in all_archs" :value="arch"> {{ arch }} </option>
        </select>
    </div>

<table>

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
<a v-for="(url_tmpl, format) in pkg.gui_pkg_tmpl" class="download-link-span" :href="renderUrlTmpl(url_tmpl)">
{{format}}
</a>
</td>

<td>
<a v-for="(url_tmpl, format) in pkg.cli_pkg_tmpl" class="download-link-span" :href="renderUrlTmpl(url_tmpl)">
{{format}}
</a>
</td>

<td>
{{ pkg.comment }}
</td>

</tr>

</table>
