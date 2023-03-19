import * as core from '@actions/core';

type RunnerOs = 'windows-latest' | 'macos-latest' | 'ubuntu-latest';

type MatrixEntry = {
  os: RunnerOs,
  target: string
};

function collect(oses: RunnerOs[]): MatrixEntry[] {
  const entries = [];

  for (const os of oses) {
    const targets = core.getInput(os, { required: false }).trim().split(/\s+/);
    for (const target of targets) {
      entries.push({ os, target });
    }
  }

  return entries;
}

async function run(): Promise<void> {
  try {
    const toolchain = core.getInput('toolchain');
    if (toolchain !== 'rust') {
      throw new RangeError(`Unsupported toolchain '${toolchain}'. The only currently supported toolchain is 'rust'.`);
    }

    const include = collect(['windows-latest', 'macos-latest', 'ubuntu-latest']);

    core.info(`setOutput('include', ${JSON.stringify(include)})`);
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
