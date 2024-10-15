import { BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts'

import { Island, Player } from '../types/schema'
import { Store_SetRecord } from '../types/World/IWorld'

export function handleStoreSetRecord(event: Store_SetRecord): void {
  //   const tableId = event.params.tableId.toHexString()
  const keyTuple = event.params.keyTuple
  const staticData = event.params.staticData
  const dynamicData = event.params.dynamicData

  handleIslandClaimed(keyTuple, staticData, dynamicData)

  // Remove the else if block for CreationProcessCompletedEvent as it's handled in a separate template
}

function handleIslandClaimed(keyTuple: Bytes[], staticData: Bytes, dynamicData: Bytes): void {
  const playerId = ethereum
    .decode('uint256', keyTuple[0])!
    .toBigInt()
    .toString()
  let player = Player.load(playerId)
  if (!player) {
    player = new Player(playerId)
    player.save()
  }

  const coordinatesX = ethereum.decode('uint32', Bytes.fromUint8Array(staticData.slice(0, 4)))!.toI32()
  const coordinatesY = ethereum.decode('uint32', Bytes.fromUint8Array(staticData.slice(4, 8)))!.toI32()
  const claimedAt = ethereum.decode('uint64', Bytes.fromUint8Array(staticData.slice(8, 16)))!.toBigInt()

  const islandId = playerId + '-' + coordinatesX.toString() + '-' + coordinatesY.toString()
  const island = new Island(islandId)
  island.player = player.id
  island.coordinatesX = BigInt.fromI32(coordinatesX)
  island.coordinatesY = BigInt.fromI32(coordinatesY)
  island.claimedAt = claimedAt
  island.save()
}
