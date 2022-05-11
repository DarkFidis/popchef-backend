const { join, relative } = require('path')
const { series } = require('nps-utils')
const { engines } = require('./package.json')

const baseDir = relative(process.cwd(), __dirname) || '.'
const jestOpts = {
  all: '--runInBand=true ',
  e2e: '--runInBand=true ',
  integration: '--runInBand=true ',
  unit: '',
}

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
    cover: {
      all: {
        description: 'Run all tests coverage',
        script: series.nps('cover.unit', 'cover.integration', 'cover.e2e'),
      },
      default: {
        description: 'Run tests coverage',
        script: `jest ${jestOpts.all}--coverage -c jest.config.js`,
      },
      e2e: {
        default: {
          description: 'Run e2e tests coverage',
          script: `jest ${jestOpts.e2e}--coverage -c src/test/e2e/jest.config.js`,
        },
        open: {
          description: 'Open tests e2e coverage report',
          script: `open-cli ${join(baseDir, 'dist/coverage/e2e/index.html')}`,
        },
      },
      integration: {
        default: {
          description: 'Run integration tests coverage',
          script: `jest ${jestOpts.integration}--coverage -c src/test/integration/jest.config.js`,
        },
        open: {
          description: 'Open tests integration coverage report',
          script: `open-cli ${join(baseDir, 'dist/coverage/integration/index.html')}`,
        },
        watch: {
          description: 'Run integration tests coverage watch',
          script: [
            'jest',
            '--coverage',
            '--watchAll',
            `${jestOpts.integration}-c src/test/integration/jest.config.js`,
          ].join(' '),
        },
      },
      open: {
        description: 'Open tests coverage report',
        script: `open-cli ${join(baseDir, 'dist/coverage/all/index.html')}`,
      },
      unit: {
        default: {
          description: 'Run unit tests coverage',
          script: `jest ${jestOpts.unit}--coverage -c src/test/unit/jest.config.js`,
        },
        open: {
          description: 'Open tests unit coverage report',
          script: `open-cli ${join(baseDir, 'dist/coverage/unit/index.html')}`,
        },
        watch: {
          description: 'Run tests coverage watch',
          script: [
            'jest',
            '--coverage',
            '--watchAll',
            `${jestOpts.unit}-c src/test/unit/jest.config.js`,
          ].join(' '),
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
    test: {
      all: {
        description: 'Run all tests',
        script: series.nps('test.unit', 'test.integration', 'test.e2e'),
      },
      default: {
        description: 'Run tests',
        script: `jest ${jestOpts.all}-c jest.config.js`,
      },
      e2e: {
        default: {
          description: 'Run e2e tests',
          script: `jest ${jestOpts.e2e}-c src/test/e2e/jest.config.js`,
        },
      },
      integration: {
        default: {
          description: 'Run integration tests',
          script: `jest ${jestOpts.integration}-c src/test/integration/jest.config.js`,
        },
        update: {
          description: 'Run integration tests updating snapshots',
          script: `jest ${jestOpts.integration}-u -c src/test/integration/jest.config.js`,
        },
        watch: {
          description: 'Run integration tests watch',
          script: `jest ${jestOpts.integration}--watchAll -c src/test/integration/jest.config.js`,
        },
      },
      unit: {
        default: {
          description: 'Run unit tests',
          script: `jest ${jestOpts.unit}-c src/test/unit/jest.config.js`,
        },
        update: {
          description: 'Run unit tests updating snapshots',
          script: `jest ${jestOpts.unit}-u -c src/test/unit/jest.config.js`,
        },
        staged: {
          description: 'Run unit tests for staged files',
          script: `jest ${jestOpts.unit}-o -c src/test/unit/jest.config.js`,
        },
        watch: {
          description: 'Run unit tests watch',
          script: `jest ${jestOpts.unit}--watchAll -c src/test/unit/jest.config.js`,
        },
      },
      update: {
        description: 'Run tests updating snapshots',
        script: `jest ${jestOpts.all}-u -c jest.config.js`,
      },
      watch: {
        description: 'Run tests watch',
        script: `jest ${jestOpts.all}--watchAll -c src/test/default/jest.config.js`,
      },
    },
  }
};
