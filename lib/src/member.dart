class Member {
  final String name;

  Member(this.name) {
    if (name.trim().isEmpty) {
      throw ArgumentError.value(name, 'name', 'name cannot be null');
    }
  }
  
}
