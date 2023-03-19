import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const toolchain = core.getInput('toolchain');
    if (toolchain !== 'rust') {
      throw new RangeError(`Unsupported toolchain '${toolchain}'. The only currently supported toolchain is 'rust'.`);
    }

    const include = [];

    // FIXME: abstract the repeated boilerplate

    const windows = core.getInput('windows-latest', { required: false }).trim().split(/\s+/);
    for (const target of windows) {
      include.push({ os: 'windows-latest', target });
    }

    const macOS = core.getInput('macos-latest', { required: false }).trim().split(/\s+/);
    for (const target of macOS) {
      include.push({ os: 'macos-latest', target });
    }

    const ubuntu = core.getInput('ubuntu-latest', { required: false }).trim().split(/\s+/);
    for (const target of ubuntu) {
      include.push({ os: 'ubuntu-latest', target });
    }

    core.setOutput('include', include);
  } catch (err: unknown) {
    if (err instanceof Error) {
      core.setFailed(err.message);
    } else {
      core.setFailed(String(err));
    }
  }
}

run();
