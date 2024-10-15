import { Island, Player } from '../types/schema'
import { IslandClaimedEvent } from '../types/templates/PlayerSystem/PlayerSystem'

export function handleIslandClaimed(event: IslandClaimedEvent): void {
  let player = Player.load(event.params.id.toString())
  if (!player) {
    player = new Player(event.params.id.toString())
    player.save()
  }

  const islandId =
    event.params.id.toString() + '-' + event.params.coordinatesX.toString() + '-' + event.params.coordinatesY.toString()
  const island = new Island(islandId)
  island.player = player.id
  island.coordinatesX = event.params.coordinatesX
  island.coordinatesY = event.params.coordinatesY
  island.claimedAt = event.params.claimedAt
  island.save()
}
