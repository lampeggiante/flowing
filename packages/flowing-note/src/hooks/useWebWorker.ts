let workerInstance: Worker | null = null

function getWorker() {
  if (workerInstance) return workerInstance
  workerInstance = new Worker(new URL('../services/worker', import.meta.url))
  console.log(workerInstance)
  return workerInstance
}

const useWebWorker = () => {
  return {
    getWorker
  }
}

export default useWebWorker
