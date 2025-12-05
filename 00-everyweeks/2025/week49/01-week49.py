# Day 1: Secret Entrance


class NodeRing:
    # Define a doubly linked node list class
    def __init__(self, value):
        self.value = value
        self.next = None
        self.previous = None

# Create a doubly linked list ring example
node_1 = NodeRing(0)
node_2 = NodeRing(1)
node_3 = NodeRing(2)
node_4 = NodeRing(3)
node_5 = NodeRing(4)

node_1.next = node_2
node_1.previous = node_5
node_2.next = node_3
node_2.previous = node_1
node_3.next = node_4
node_3.previous = node_2
node_4.next = node_5
node_4.previous = node_3
node_5.next = node_1
node_5.previous = node_4

def instruction_splitter(instruction_raw: str) -> tuple[str, int]:
    # Split direction and distance
    # E.g. "L68" -> ("left", 68)
    # E.g. "R48" -> ("right", 48)
    direction = "left" if instruction_raw[0] == "L" else "right"
    distance = int(instruction_raw[1:])
    return direction, distance

def instruction_dialer(instruction_split: tuple[str, int], node: NodeRing) -> None:
    # Execute the instruction
    # E.g. ("left", 68) -> rotate left 68 clicks
    # E.g. ("right", 48) -> rotate right 48 clicks
    match instruction_split:
        case ("left", distance):
            print(f"Rotating left {distance} clicks")
            for _ in range(distance):
                node = node.previous
        case ("right", distance):
            print(f"Rotating right {distance} clicks")
            for _ in range(distance):
                node = node.next
    return node

pos_1 = instruction_dialer(instruction_splitter("L2"), node_1)
print(pos_1.value) # 3
pos_2 = instruction_dialer(instruction_splitter("R1"), pos_1)
print(pos_2.value) # 4

def instructions_exector(instructions: [str]) -> int:
    # given a list of strings
    # iterate through the list
    # for each item call the instruction dialer
    # if the dial value is 0, increment the count
    # return the count
    pass
