const { join, relative } = require('path')
const { engines } = require('./package.json')

const baseDir = relative(process.cwd(), __dirname) || '.'

module.exports = {
  scripts: {
    beautify: {
      default: {
        description: 'List files to be beautified',
        script: 'prettier -l "src/**/*.{js,ts}"',
      },
      fix: {
        description: 'Beautify source files',
        script: 'prettier --write "src/**/*.{js,ts}"',
      },
    },
    build: {
      default: {
        description: 'Build all',
        script: 'nps build.src',
      },
      gitversion: {
        description: 'set git version to .gitversion file',
        script: `git describe --always > ${join(baseDir, '.gitversion')} || true`,
      },
      nodeversion: {
        description: 'build .node-version file',
        script: `echo '${engines.node}' > ${join(baseDir, '.node-version')}`,
      },
      src: {
        default: {
          description: 'Transpile ts sources',
          script: 'tsc',
        },
        watch: {
          description: 'Transpile ts sources in watch mode',
          script: 'tsc -w',
        },
        main: {
          default: {
            description: 'Transpile main ts sources',
            script: `tsc -b ${join(baseDir, 'src', 'main', 'tsconfig.json')}`,
          },
          watch: {
            description: 'Transpile main ts sources in watch mode',
            script: `tsc -w -b ${join(baseDir, 'src', 'main', 'tsconfig.json')}`,
          },
        },
      },
    },
    lint: {
      default: {
        description: 'Lint TypeScript sources',
        script: `eslint ${baseDir} --ext .ts`,
      },
      staged: {
        description: 'Lint TypeScript sources',
        script: `lint-staged`,
      },
    },
    nps: 'nps',
    test: 'echo "Error: no test specified" && exit 1'
  }
};
