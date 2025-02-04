---
home: hello
---

<script setup lang="ts">
import { ref } from 'vue'
import { data } from '../../metadata.data.js'

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
        comment: "Support Windows 8 and above, Windows 7 only supports EasyTier v2.1.2 and below."
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
        comment: "Windows 7 needs to be SP1 and above, and you need to install the two patches KB3063858 and KB4474419. This version is EasyTier v2.1.2."
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
        comment: "After installing the GUI, you need to manually execute xattr -c /Applications/easytier-gui.app, otherwise it will prompt that the file is damaged"
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
        comment: "After installing the GUI, you need to manually execute xattr -c /Applications/easytier-gui.app, otherwise it will prompt that the file is damaged"
    },
    {
        os: "Android",
        arch: "universal",
        gui_pkg_tmpl: {
            "apk": 'https://github.com/EasyTier/EasyTier/releases/download/v{}/app-universal-release.apk',
        },
        cli_pkg_tmpl: {},
        comment: "If you encounter abnormal display issues, please try upgrading WebView"
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

# Download { #download }

You can directly go to the [GitHub Release page](https://github.com/EasyTier/EasyTier/releases) to view the download links for all versions, or use the table below to find the version that suits you.

The command line program package includes three executables:

- `easytier-core`: The core program of EasyTier
- `easytier-cli`: EasyTier management program, after starting easytier-core, you can use easytier-cli to view virtual network information
- `easytier-web`: Used for self-hosting the EasyTier Web console backend, generally no need to self-host, you can use the official Web console

## <a :href="url + version">EasyTier v{{ version }}</a> { #latest }

- GitHub Acceleration
    <div>
        <select name="pets" id="gh-accel-select" v-model="accel_proxy" class="filter-select">
            <option value=""> Direct </option>
            <option v-for="p in all_proxy" :value="p"> {{ p }} </option>
        </select>
    </div>

- Filter by Operating System
    <div>
        <select name="pets" id="os-select" v-model="filter_os" class="filter-select">
            <option value=""> All </option>
            <option v-for="os in all_os" :value="os"> {{ os }} </option>
        </select>
    </div>

- Filter by Hardware Architecture
    <div>
        <select name="pets" id="arch-select" v-model="filter_arch" class="filter-select">
            <option value=""> All </option>
            <option v-for="arch in all_archs" :value="arch"> {{ arch }} </option>
        </select>
    </div>

<table>

<thead>
<tr>
<th> Operating System </th>
<th> Hardware Architecture </th>
<th> GUI Program </th>
<th> CLI Program </th>
<th> Notes </th>
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
