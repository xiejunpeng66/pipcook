import { app, assert } from 'midway-mock/bootstrap';
import { PipelineService } from '../../src/service/pipeline';

const mockPipeline = {
  id: 'mockId',
  name: 'mockName',
  dataCollectId: 'dataCollect',
  dataCollect: 'dataCollect',
  dataCollectParams: '{}',
  dataAccessId: 'dataAccessId',
  dataAccess: 'dataAccess',
  dataAccessParams: 'dataAccess',
  dataProcessId: 'dataProcess',
  dataProcess: 'dataProcess',
  dataProcessParams: 'dataProcess',
  datasetProcessId: 'dataProcess',
  datasetProcess: 'dataProcess',
  datasetProcessParams: 'dataProcess',
  modelDefineId: 'modelDefine',
  modelDefine: 'modelDefine',
  modelDefineParams: 'modelDefine',
  modelLoadId: 'modelLoadId',
  modelLoad: 'modelLoad',
  modelLoadParams: '{}',
  modelTrainId: 'modelTrain',
  modelTrain: 'modelTrain',
  modelTrainParams: 'modelTrain',
  modelEvaluateId: 'modelEval',
  modelEvaluate: 'modelEval',
  modelEvaluateParams: 'modelEval'
};

describe('test the pipeline service', () => {
  it('#prepare', async () => {
    const pipeline: PipelineService = await app.applicationContext.getAsync<PipelineService>('pipelineService');
    await pipeline.removePipelines();
  });
  it('#create pipeline and get created pipeline', async () => {
    const pipeline: PipelineService = await app.applicationContext.getAsync<PipelineService>('pipelineService');
    const obj = await pipeline.createPipeline(mockPipeline);

    const p1 = await pipeline.getPipeline(obj.id);
    assert(p1.id === obj.id, 'found the pipeline by created id');
    assert(p1.dataCollect === 'dataCollect');
    await pipeline.removePipelineById(obj.id);
    
    console.log('removed and query');
    const notExists = await pipeline.getPipeline(obj.id);
    assert(notExists == null);
  });

  it('#update pipeline', async () => {
    const pipeline: PipelineService = await app.applicationContext.getAsync<PipelineService>('pipelineService');
    const obj = await pipeline.createPipeline(mockPipeline);

    await pipeline.updatePipelineById(obj.id, {
      dataCollectId: 'updatedId',
      modelTrainId: 'updatedId'
    });

    const p1 = await pipeline.getPipeline(obj.id);
    assert(p1.dataCollectId === 'updatedId');
    assert(p1.modelTrainId === 'updatedId');

    // clean
    await pipeline.removePipelineById(obj.id);
  });
});
