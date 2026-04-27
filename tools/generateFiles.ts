import { select } from '@inquirer/prompts';

async function main() {
  const layers = [
    'Entity',
    'UseCase',
    'Interface addapter',
    'Framework & driver',
  ] as const;

  type Layer = (typeof layers)[number];

  const layer = await select<Layer>({
    message: 'どの層のファイルを生成しますか？',
    choices: layers.map((l) => ({ value: l })),
  });

  if (layer === 'Entity') {
    console.log('Entity層のファイルを生成します。');
    // Entity層のファイル生成ロジックをここに実装
  } else if (layer === 'UseCase') {
    console.log('UseCase層のファイルを生成します。');
    // UseCase層のファイル生成ロジックをここに実装
  } else if (layer === 'Interface addapter') {
    console.log('Interface addapter層のファイルを生成します。');
    // Interface addapter層のファイル生成ロジックをここに実装
  } else if (layer === 'Framework & driver') {
    console.log('Framework & driver層のファイルを生成します。');
    // Framework & driver層のファイル生成ロジックをここに実装
  }
}

main();
